import type { Song } from "~/assets/types";
import { type Storage } from "unstorage";

export const useLibrary = defineStore("useLibrary", () => {
  const likes = shallowRef<Song[]>([]);
  const playlists = shallowRef<Song[][]>([]);
  const downloaded = shallowRef<string[]>();
  let downloadedIndexDB: Storage<string>;
  let likesIndexDB: Storage<Song>;

  if (window) {
    likesIndexDB = useIndexedDB("likes");
    likesIndexDB
      .getKeys()
      .then((ids) => likesIndexDB.getItems(ids))
      .then((songs) => (likes.value = songs.map(({ value }) => value)));

    downloadedIndexDB = useIndexedDB("downloaded");
    downloadedIndexDB.getKeys().then((ids) => (downloaded.value = ids));
  }

  async function retreiveData(id: string) {
    if (!id) return null;
    if (!downloadedIndexDB) return null;

    return downloadedIndexDB.getItem(id);
  }

  return { likes, playlists, downloaded, retreiveData };
});
