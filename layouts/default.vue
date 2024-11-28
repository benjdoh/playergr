<script setup lang="ts">
const player = usePlayer();

useHead({
  meta: [
    {
      name: "viewport",
      content:
        "initial-scale=1, viewport-fit=cover,user-scalable=no,maximum-scale=1",
    },
  ],
  link: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
    },
  ],
  title: "Player GR",
});
</script>

<template>
  <Body class="bg-black text-white text-sm" />

  <keep-alive> <slot /> </keep-alive>

  <div :class="[player.current ? 'h-32' : 'h-16']" />
  <div
    :class="[
      'bg-black/50 backdrop-blur-xl w-100% fixed bottom-0',
      player.current ? 'h-34' : 'h-16',
    ]"
  />

  <current-player />
  <navigation />
</template>
