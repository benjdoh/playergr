<script setup lang="ts">
const audioPlayer = useAudioPlayer();
const clickedLinks = shallowRef<string[]>([]);
const route = useRoute();
const links = [
  {
    to: "/",
    text: "Home",
    outline: "ph:house",
    solid: "ph:house-fill",
  },
  {
    to: "/search",
    text: "Search",
    outline: "ph:magnifying-glass",
    solid: "ph:magnifying-glass-fill",
  },
  {
    to: "/library",
    text: "Library",
    outline: "ph:stack",
    solid: "ph:stack-fill",
  },
  {
    to: "/settings",
    text: "Settings",
    outline: "ph:gear",
    solid: "ph:gear-fill",
  },
];

function linkClicked(to: string) {
  clickedLinks.value.push(to);

  setTimeout(
    () => (clickedLinks.value = clickedLinks.value.filter((x) => x !== to)),
    200
  );
}
</script>

<template>
  <div :class="['grid grid-cols-4 w-full', audioPlayer.current ? 'pt-2' : '']">
    <nuxt-link
      v-for="link of links"
      :to="link.to"
      class="h-16 grid place-items-center"
      @click="linkClicked(link.to)"
    >
      <div
        :class="[
          'transform transition duration-200 flex flex-col items-center gap-1',
          clickedLinks.includes(link.to) ? 'scale-90' : '',
        ]"
      >
        <Icon
          :name="route.path === link.to ? link.solid : link.outline"
          class="size-6"
        />

        <span class="text-xs">{{ link.text }}</span>
      </div>
    </nuxt-link>
  </div>
</template>
