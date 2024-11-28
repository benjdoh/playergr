<script setup lang="ts">
import { useScreenSafeArea } from "@vueuse/core";
import {
  HomeIcon as HomeOutline,
  MagnifyingGlassIcon as SearchOutline,
  RectangleStackIcon as LibraryOutline,
  Cog6ToothIcon as SettingsOutline,
} from "@heroicons/vue/24/outline";
import {
  HomeIcon as HomeSolid,
  MagnifyingGlassIcon as SearchSolid,
  RectangleStackIcon as LibrarySolid,
  Cog6ToothIcon as Settingssolid,
} from "@heroicons/vue/24/solid";

const route = useRoute();
const { bottom } = useScreenSafeArea();
const links = [
  {
    to: "/",
    text: "Home",
    outline: HomeOutline,
    solid: HomeSolid,
  },
  {
    to: "/search",
    text: "Search",
    outline: SearchOutline,
    solid: SearchSolid,
  },
  {
    to: "/library",
    text: "Library",
    outline: LibraryOutline,
    solid: LibrarySolid,
  },
  {
    to: "/settings",
    text: "Settings",
    outline: SettingsOutline,
    solid: Settingssolid,
  },
];
</script>

<template>
  <div class="fixed bottom-0 w-100%">
    <div
      class="grid grid-cols-4"
      :style="{
        paddingBottom: bottom,
      }"
    >
      <nuxt-link
        v-for="link of links"
        :to="link.to"
        class="h-16 grid place-items-center"
      >
        <div
          class="transform transition duration-200 active:(scale-90) flex flex-col items-center gap-1"
        >
          <component
            :is="route.path === link.to ? link.solid : link.outline"
            class="size-6"
          />

          <span class="text-xs">{{ link.text }}</span>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>
