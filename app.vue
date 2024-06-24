<script setup lang="ts">
import type { Player } from './assets/types'

provide('useAudioSources', reactive<Record<string, string>>({}))
provide(
  'usePlayer',
  reactive<Player>({
    current: null,
    playing: false,
    volume: 1,
    queue: [],
  })
)
</script>

<template>
  <div class="h-screen bg-black w-screen max-w-screen max-h-screen text-xs">
    <div class="h-12 p-4 bg-black">
      <span class="font-semibold">Player GR</span>
    </div>

    <SearchContainer />

    <Player />
  </div>
</template>
