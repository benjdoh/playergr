<script setup lang="ts">
useAudio()
</script>

<template>
  <div class="h-screen bg-black w-screen max-w-screen max-h-screen">
    <div class="h-12 p-4 bg-black">
      <span class="font-semibold">Player GR</span>
    </div>

    <SearchContainer />

    <Player />
  </div>
</template>
