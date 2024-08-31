<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { vInfiniteScroll } from '@vueuse/components'

const search = useSearch()
const player = useAudioPlayer()
const thumnailIndexes = ref<Record<string, number>>({})
const thumbnailIndex = computed(() => {
  const indexes = thumnailIndexes.value

  return (id: string) => {
    if (!indexes[id]) {
      indexes[id] = 0
      thumnailIndexes.value = indexes
    }

    return indexes[id]
  }
})

function updateThumnailIndex(id: string, index: number) {
  const indexes = Object.create(thumnailIndexes.value)
  indexes[id] = index
  thumnailIndexes.value = indexes
}

function joinArtists(artists: string[]) {
  artists[artists.length - 1] = ` ${artists.at(-1)}`

  return artists.join(', ')
}
</script>

<template>
  <!-- search containter -->
  <div class="top-0 p-2 flex items-center gap-4 bg-black">
    <div class="bg-dark-700 w-full relative rounded-md">
      <input
        v-model="search.query"
        :class="['bg-transparent outline-none text-white px-3 py-1 h-10 flex items-center w-full', !search.query ? '' : 'pr-8']"
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
            search.songs = []
            search.query = ''
          }
        "
      >
        <XMarkIcon class="size-6" />
      </button>
    </div>
  </div>

  <!-- list of songs -->
  <div class="flex-grow overflow-y-auto overflow-x-hidden p-4 gap-4 flex flex-col">
    <button
      v-for="song of search.songs"
      :key="song.id"
      class="flex h-14 min-h-14 gap-4"
      @click="player.current = song"
    >
      <img
        class="h-full rounded-sm"
        :src="song.thumbnails[thumbnailIndex(song.id)].url"
        :alt="song.title + ' Artwork'"
        @error="updateThumnailIndex(song.id, thumbnailIndex(song.id) + 1)"
      />

      <div class="overflow-hidden text-xs h-full flex flex-col justify-evenly">
        <p class="">
          {{ song.title }}
        </p>

        <p class="text-white/60">
          {{ song.artists.length > 1 ? joinArtists(song.artists.map((v: any) => v.name)) : song.artists[0]?.name || song.artists[0] }}
        </p>
      </div>
    </button>
  </div>
</template>
