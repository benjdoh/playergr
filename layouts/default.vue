<script setup lang="ts">
import {
  useElementBounding,
  useScreenSafeArea,
  useTransition,
} from "@vueuse/core";

const audio_player = useAudioPlayer();
const safe_area = useScreenSafeArea();
const bottom = useTransition(
  () => Number(safe_area.bottom.value.slice(0, -2)),
  { duration: 200 }
);
const nav = useTemplateRef("nav");
const { height } = useElementBounding(nav);

useHead({
  meta: [
    {
      name: "viewport",
      content:
        "initial-scale=1.0,width=device-width,viewport-fit=cover,user-scalable=no,maximum-scale=1,minimum-scale=1",
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
  title: "deeshee",
});
</script>

<template>
  <Body class="bg-black text-white text-sm font-inter overflow-x-hidden" />

  <keep-alive> <slot /> </keep-alive>

  <div :style="{ height: height + 'px' }" />
  <div
    ref="nav"
    class="bg-black/50 backdrop-blur-2xl w-full fixed bottom-0 p-2 z-10"
  >
    <current-player v-if="audio_player.current" />
    <navigation />
    <div :style="{ height: `calc(${bottom}px)` }"></div>
  </div>
</template>
