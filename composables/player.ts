import type { Player, Song } from "~/assets/types/player";
import { defineStore } from "pinia";
import type { StreamingData } from "~/assets/types";

export const useAudioPlayer = defineStore("useAudioPlayer", () => {
  const mediaSession = window?.navigator?.mediaSession;

  const current = shallowRef<Song | null>(null);
  const upnext = shallowRef<Song[]>([]);
  const queue = shallowRef<Song[]>([]);
  const history = shallowRef<Song[]>([]);
  const audio = window?.Audio ? new Audio() : null;
  const isPlaying = shallowRef(false);
  const timestamp = shallowRef(0);

  if (mediaSession) {
    mediaSession.setActionHandler("play", () => (isPlaying.value = true));
    mediaSession.setActionHandler("pause", () => (isPlaying.value = false));
    mediaSession.setActionHandler("previoustrack", previous);
    mediaSession.setActionHandler("nexttrack", next);
    mediaSession.setActionHandler(
      "seekbackward",
      () => (timestamp.value = Math.max(timestamp.value - 10, 0))
    );
    mediaSession.setActionHandler(
      "seekforward",
      () => (timestamp.value = Math.max(timestamp.value + 10, 0))
    );

    const indexDB = useLocalStorage();
    watch(current, (v) => indexDB.setItem("current", JSON.stringify(v)));
    watch(upnext, (v) => indexDB.setItem("upnext", JSON.stringify(v)));
    watch(queue, (v) => indexDB.setItem("queue", JSON.stringify(v)));
    watch(history, (v) => indexDB.setItem("history", JSON.stringify(v)));

    indexDB.getItem<Song>("current").then((v) => (current.value = v));
    indexDB.getItem<Song[]>("upnext").then((v) => (upnext.value = v || []));
    indexDB.getItem<Song[]>("queue").then((v) => (queue.value = v || []));
    indexDB.getItem<Song[]>("history").then((v) => (history.value = v || []));
  }

  function next() {
    let song: Song;

    if (upnext.value.length > 0) {
      song = upnext.value[0];
      upnext.value = upnext.value.slice(1);
    } else {
      song = queue.value[0];
      queue.value = queue.value.slice(1);
    }

    current.value = song || null;
  }

  function previous() {
    let song: Song | null = null;

    if (history.value.length > 0) {
      song = history.value[0];
      history.value = history.value.slice(1);
    }

    current.value = song;
  }

  function togglePlaying() {
    isPlaying.value = !isPlaying.value;
  }

  watch(current, updateMediaSession);
  watch(isPlaying, async (v) => {
    if (!audio || !current.value) return;

    if (!v) return audio.pause();

    // const metadata = await $fetch<StreamingData>("/api/streaming-data", {
    //   method: "POST",
    //   query: { id: current.value.id },
    // });

    audio.src = `/api/v/${current.value.id}/stream`;
    audio.play();
  });

  return {
    audio,
    current,
    isPlaying,
    timestamp,
    queue,
    upnext,
    history,
    next,
    previous,
    togglePlaying,
  };
});

export function updateMediaSession(current: Song | null) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: current?.title || "",
    artist: current?.artists.join(", ") || "",
    album: current?.album.name || "",
    artwork:
      current?.thumbnails.map((t) => ({
        src: t.url,
        sizes: `${t.width}x${t.height}`,
      })) || [],
  });
}
