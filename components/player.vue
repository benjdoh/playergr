<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import type { Player } from '~/assets/types'
import { createStorage } from 'unstorage'
import idb from 'unstorage/drivers/indexedb'

const player = useAudioPlayer()
const audioEl = ref<HTMLAudioElement>()
const audioCtx = ref<AudioContext>()

watchDebounced(
  player,
  async (value) => {
    if (!audioEl.value) return
    if (!value?.current) return // || (prev?.current && value.current.id === prev.current.id)
    if (!audioCtx.value) {
      // @ts-expect-error
      audioCtx.value = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: 'interactive' })
    }

    navigator.mediaSession.playbackState = 'playing'

    navigator.mediaSession.metadata = new MediaMetadata({
      title: value.current.title,
      artist: value.current.artists.join(', '),
      album: value.current.album.name,
      artwork: value.current.thumbnails.map((v) => ({ src: v.url })),
    })

    navigator.mediaSession.setActionHandler('play', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('pause', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('stop', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('seekbackward', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('seekforward', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('seekto', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      /* Code excerpted. */
    })
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      /* Code excerpted. */
    })

    const res = await fetch(`/api/stream?id=${value.current.id}`)
    const buff = await res.arrayBuffer()

    const storage = createStorage({
      driver: idb({
        dbName: 'playergr',
        storeName: 'songs',
      }),
    })
    if (!storage.getItem(value.current.id)) {
      storage.setItem(value.current.id, JSON.stringify(new Uint8Array(buff)))
    }

    const source = audioCtx.value.createBufferSource()
    source.buffer = await audioCtx.value.decodeAudioData(buff)
    source.connect(audioCtx.value.destination)
    source.start(audioCtx.value.currentTime)
  },
  { debounce: 500, deep: true }
)

onMounted(() => {})

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
  <div :class="['fixed bottom-16 w-screen h-16 z-50 max-w-screen transform', player?.current ? '' : 'translate-y-200%']">
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
