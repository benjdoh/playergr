import type { Player, SearchFilter, Song } from "~/assets/types/player";
import { defineStore } from "pinia";
import type { MusicSearchResult } from "~/assets/types";
import { watchDebounced } from "@vueuse/core";

export const useSearch = defineStore("useSearch", () => {
  const searching = shallowRef(false);
  const songs = shallowRef<Song[]>([]);
  const query = shallowRef("");
  const continuation = shallowRef<string>();
  const filter = shallowRef<SearchFilter | null>("songs");

  async function fetchSongs(append: boolean) {
    if (!query.value) {
      continuation.value = undefined;
      songs.value = [];

      return;
    }

    const data = await $fetch<MusicSearchResult>("/api/search", {
      method: "POST",
      body: {
        query: query.value,
        continuation: append ? continuation.value : undefined,
      },
    });

    if (!data) return;

    songs.value = append ? [...songs.value, ...data.songs] : data.songs;
    continuation.value = data.continuation;
  }

  watchDebounced(query, () => fetchSongs(false), {
    debounce: 250,
  });

  return {
    searching,
    songs,
    query,
    fetchSongs,
    filter,
  };
});
