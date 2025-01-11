import type { Player, Song } from "~/assets/types/player";
import { defineStore } from "pinia";
import type { StreamingData } from "~/assets/types";

export const useAudioPlayer = defineStore("useAudioPlayer", () => {
  const mediaSession = window?.navigator?.mediaSession;

  const skip_next = ref(false);
  const current = shallowRef<Song | null>(null);
  const upnext = shallowRef<Song[]>([]);
  const queue = shallowRef<Song[]>([]);
  const history = shallowRef<Song[]>([]);
  const isPlaying = shallowRef(false);
  const timestamp = shallowRef(0);
  const is_loading = ref(false);

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
  watch(isPlaying, async (playing) => {
    if (!current.value) return;

    const audio = current.value.audio;

    if (!playing) return current.value.audio.pause();

    audio.addEventListener("timeupdate", () => {
      timestamp.value = audio.currentTime;

      console.log(timestamp.value);
    });

    try {
      is_loading.value = true;
      audio.play();
    } catch (error) {
      isPlaying.value = false;
    }

    is_loading.value = false;
  });

  const audio_fixing_watcher = watch(
    current,
    (v) => {
      if (!v) return;
      let audio = v.audio;
      const uri = `/api/stream?id=${v.id}`;

      if (audio && audio.src) return;
      audio = new Audio(uri);

      current.value = {
        ...v,
        audio,
      };

      audio.onload = () => audio.play();
    },
    { onTrigger(event) {} }
  );

  watch(queue, (songs) => {
    if (songs.length === 0) return;

    for (const [index, song] of songs.entries()) {
      if (song.audio && "src" in song.audio) continue;

      songs[index] = { ...song, audio: new Audio() };
    }

    queue.value = songs;
  });

  return {
    current,
    isPlaying,
    timestamp,
    queue,
    upnext,
    history,
    next,
    previous,
    togglePlaying,
    is_loading,
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
