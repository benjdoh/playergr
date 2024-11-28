<script setup lang="ts">
import uniqolor from "uniqolor";
const list = [...Array(30)].map(() =>
  uniqolor.random({ format: "hex", lightness: [25, 100] })
);
</script>

<template>
  <div class="grid grid-cols-2 text-white gap-4 p-4">
    <client-only>
      <div
        v-for="c of list"
        :key="c.color"
        class="h-20 p-3 rounded"
        :style="{ background: c.color }"
      >
        {{ c.color }}
      </div>
    </client-only>
  </div>
</template>
