<script setup lang="ts">
import {
  XMarkIcon,
  HeartIcon,
  EllipsisVerticalIcon,
} from "@heroicons/vue/24/outline";
import { vInfiniteScroll } from "@vueuse/components";
import type { SearchFilter } from "~/assets/types";

const searchFilter: SearchFilter[] = [
  "songs",
  "videos",
  "albums",
  "artists",
  "playlists",
  "profiles",
  "podcasts",
  "episodes",
];
const search = useSearch();
const thumnailIndexes = shallowRef<Record<string, number>>({});
const thumbnailIndex = computed(() => {
  const indexes = thumnailIndexes.value;

  return (id: string) => {
    if (!indexes[id]) {
      indexes[id] = 0;
      thumnailIndexes.value = indexes;
    }

    return indexes[id];
  };
});

function updateThumnailIndex(id: string, index: number) {
  const indexes = Object.create(thumnailIndexes.value);
  indexes[id] = index;
  thumnailIndexes.value = indexes;
}

function joinArtists(artists: string[]) {
  artists[artists.length - 1] = ` ${artists.at(-1)}`;

  return artists.join(", ");
}
</script>

<template>
  <!-- search containter -->
  <div class="sticky top-0 p-4 flex items-center gap-4 bg-black">
    <div class="bg-dark-700 w-full relative rounded-md">
      <input
        v-model="search.query"
        :class="[
          'bg-transparent outline-none text-white px-3 py-1 h-10 flex items-center w-full',
          !search.query ? '' : 'pr-8',
        ]"
        type="text"
        placeholder="Search songs, playlist, artists..."
        @focus="search.searching = true"
        @blur="search.searching = false"
      />
      <button
        v-if="!!search.query"
        class="absolute w-8 h-8 top-1 right-1 grid place-items-center"
        @click="
          () => {
            search.songs = [];
            search.query = '';
          }
        "
      >
        <XMarkIcon class="size-6" />
      </button>
    </div>
  </div>

  <div class="space-y-4">
    <div class="px-4">
      <div
        v-if="search.songs.length > -10"
        class="w-full flex gap-2 overflow-x-auto"
      >
        <button
          v-for="f of searchFilter"
          :key="f"
          :class="[
            'px-3 h-8 rounded-full transition-all capitalize',
            search.filter === f
              ? 'bg-white text-black'
              : 'bg-dark-500 border border-dark-200',
          ]"
          @click="search.filter = f"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <!-- list of songs -->
    <div
      class="flex-grow overflow-y-auto overflow-x-hidden px-4 pb-4 gap-4 flex flex-col"
    >
      <div v-for="song of search.songs" :key="song.id" class="flex h-14 gap-2">
        <button
          class="flex h-full gap-4 flex-grow"
          @click="usePlayer().current = song"
        >
          <img
            class="h-full rounded-sm"
            :src="song.thumbnails[thumbnailIndex(song.id)].url"
            :alt="song.title + ' Artwork'"
            @error="updateThumnailIndex(song.id, thumbnailIndex(song.id) + 1)"
          />
          <div
            class="overflow-hidden text-xs h-full flex flex-col justify-evenly items-start flex-grow text-left"
          >
            <p>
              {{ song.title }}
            </p>
            <p class="text-white/60">
              {{
                song.artists.length > 1
                  ? joinArtists(song.artists.map((v: any) => v.name))
                  : song.artists[0]?.name || song.artists[0]
              }}
            </p>
          </div>
        </button>
        <button>
          <HeartIcon class="size-6" />
        </button>
        <button>
          <EllipsisVerticalIcon class="size-6" />
        </button>
      </div>
    </div>
  </div>
</template>
