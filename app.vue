<script setup lang="ts">
useHead({
  meta: [
    {
      name: 'viewport',
      content: 'initial-scale=1, viewport-fit=cover,user-scalable=no,maximum-scale=1',
    },
  ],
  link: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
  ],
  title: 'Player GR',
})
</script>

<template>
  <div class="h-dvh w-dvw max-w-dvw max-h-dvh bg-black text-white text-sm pb-16 overflow-x-hidden overflow-y-auto pb-16 flex flex-col">
    <keep-alive>
      <NuxtPage />
    </keep-alive>

    <player />
    <navigation />
  </div>
</template>
