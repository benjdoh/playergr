<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import type { Player } from '~/assets/types'
import { s } from '~/assets/song'

const audioSources = inject<Record<string, string>>('useAudioSources')
const player = inject<Player>('usePlayer')
const audioEl = ref<HTMLAudioElement>()

watchDebounced(
  () => player,
  async (value, prev) => {
    if (!audioEl.value) return
    if (!value?.current) return // || (prev?.current && value.current.id === prev.current.id)

    audioEl.value.src = `/api/stream?id=${value.current.id}`
    audioEl.value.play()
  },
  { debounce: 500, deep: true }
)

// watchDebounced(
//   audioSource,
//   (v) => {
//     console.log(v)

//     if (!audioElem.value || !v || !sourceElem.value) return

//     const audio = new Audio(`data:audio/wav;base64,${v}`)
//     audio.play()

//     // audioElem.value.pause()
//     sourceElem.value.src = `data:audio/wav;base64,${v}`
//     // audioElem.value.play()
//   },
//   { debounce: 500 }
// )
</script>

<template>
  <audio ref="audioEl" />

  <div :class="['absolute bottom-16 w-screen h-20 p-2 z-50 max-w-screen transform', player?.current ? '' : 'translate-y-200%']">
    <div class="bg-black text-white overflow-hidden w-full h-full p-2 rounded-md flex gap-2">
      <img
        class="h-full"
        :src="player?.current?.thumbnails[1].url"
        :alt="`${player?.current?.album.name} artwork`"
      />

      <div>
        <div>{{ player?.current?.title }}</div>
        <div class="text-white/50">
          <template
            v-for="(artist, index) in player?.current?.artists || []"
            :key="artist.id"
          >
            <span>{{ artist.name }}</span>
            <span v-if="index < (player?.current?.artists.length ?? 1) - 1">,</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
