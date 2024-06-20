<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import { vInfiniteScroll } from '@vueuse/components'
import { ChevronLeft } from 'lucide-vue-next'
import { watchDebounced } from '@vueuse/core'
import type { MusicSearchResult, Song } from 'assets/types/youtube'

const audioId = useAudioID()
const containerElem = ref<HTMLDivElement>()
const songs = ref<Song[]>([])
const query = ref('')
const continuation = ref<string>()

function joinArtists(artists: string[]) {
  artists[artists.length - 1] = ` ${artists.at(-1)}`

  return artists.join(', ')
}

async function fetchSongs(append?: boolean) {
  if (!query.value) {
    continuation.value = undefined
    songs.value = []

    return
  }

  const data = await $fetch<MusicSearchResult>('/api/search', {
    method: 'POST',
    body: {
      query: query.value,
      continuation: append ? continuation.value : undefined,
    },
  })

  if (data) {
    songs.value = append ? [...songs.value, ...data.songs] || [] : data.songs
    continuation.value = data.continuation
  }
}

watchDebounced(query, () => fetchSongs(false), { debounce: 250 })
</script>

<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 bg-black text-white flex flex-col">
    <div class="p-4 flex items-center gap-4">
      <button class="h-10 flex items-center">
        <ChevronLeft
          color="white"
          :size="24"
        />
      </button>

      <input
        v-model="query"
        class="bg-dark-700 outline-none text-white px-3 py-1 rounded-md h-10 flex items-center w-full max-w-full"
        type="text"
        placeholder="Search songs..."
      />
    </div>

    <div
      v-infinite-scroll="[() => fetchSongs(true), { distance: 100 }]"
      class="flex-grow overflow-y-auto overflow-x-hidden p-4 gap-4 flex flex-col"
    >
      <button
        v-for="song of songs"
        :key="song.id"
        class="flex h-14 min-h-14 gap-4"
        @click="audioId = song.id"
      >
        <img
          class="h-full rounded-sm"
          :src="song.thumbnails[1]?.url || song.thumbnails[1] as unknown as string"
          :alt="song.name + ' Artwork'"
        />

        <div class="overflow-hidden text-xs h-full flex flex-col justify-evenly">
          <p class="">
            {{ song.name }}
          </p>

          <p class="text-white/60">
            {{ song.artists.length > 1 ? joinArtists(song.artists.map(({ name }) => name)) : song.artists[0]?.name || song.artists[0] }}
          </p>
        </div>
      </button>
    </div>
  </div>
</template>
