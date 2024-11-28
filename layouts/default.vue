<script setup lang="ts">
import { useScreenSafeArea } from "@vueuse/core";

const player = usePlayer();
const { bottom } = useScreenSafeArea();

useHead({
  meta: [
    {
      name: "viewport",
      content:
        "initial-scale=1.0,width=device-width, viewport-fit=cover,user-scalable=no,maximum-scale=1,minimum-scale=1",
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
  <Body class="bg-black text-white text-sm font-inter overflow-x-hidden" />

  <keep-alive> <slot /> </keep-alive>

  <div :class="[player.current ? 'h-32' : 'h-16']" />
  <div
    :class="[
      'bg-black/50 backdrop-blur-2xl w-full fixed bottom-0 grid grid-cols-1 p-2 z-20',
    ]"
    :style="{
      height: `calc(${bottom || '0px'} + ${player.current ? 8.5 : 4}rem)`,
      paddingBottom: bottom || '-webkit-fill-available',
    }"
  >
    <current-player v-if="player.current" />
    <navigation />
  </div>
</template>
