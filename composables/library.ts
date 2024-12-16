import type { Song } from "~/assets/types";
import { type Storage } from "unstorage";
import { useLocalStorage } from "./storage";

export const useLibrary = defineStore("useLibrary", () => {
  const likes = shallowRef<Song[]>([]);
  const playlists = shallowRef<Song[][]>([]);
  const downloaded = shallowRef<string[]>([]);
  const storage = window ? useLocalStorage() : undefined;
  const dlStorage = window ? useIndexedDB<string>("downloads") : undefined;

  if (storage) {
    storage.getItem<Song[]>("likes").then((v) => (likes.value = v || []));
  }

  if (dlStorage) {
    dlStorage.getKeys().then((ids) => (downloaded.value = ids));
  }

  async function findSongInDL(id: string) {
    if (!id) return null;
    if (!dlStorage) return null;

    return dlStorage.getItem(id);
  }

  async function download(id: string) {
    if (!dlStorage) return null;

    const res = await fetch(`/api/stream?id=${id}`, { cache: "force-cache" });
    const data = await res.clone().text();
    console.log(btoa(data));

    dlStorage.setItem(id, data);
    downloaded.value.push(id);

    return data;
  }

  watch(likes, (v) => storage?.setItem("likes", v));

  return {
    likes,
    playlists,
    download,
    downloaded,
    storage,
    dlStorage,
    findSongInDL,
  };
});
