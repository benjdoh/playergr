<script setup lang="ts">
import uniqolor from "uniqolor";

async function play() {
  const res = await $fetch("/api/test");

  const audio = new Audio(res);

  audio.play();
}
</script>

<template>
  <div class="grid grid-cols-2 text-white gap-4 p-4">
    <client-only>
      <div
        v-for="c of 60"
        :key="c"
        class="h-20 p-3 rounded"
        :style="{
          background: uniqolor(c * 2, { lightness: [25, 69] }).color,
        }"
      >
        {{ c }}
      </div>
    </client-only>

    <button class="fixed top-10 bg-red p-10" @click="play">Play</button>
  </div>
</template>
