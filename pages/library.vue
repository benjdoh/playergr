<script setup lang="ts"></script>

<template>
  <div class="grid grid-cols-3 gap-4 p-4">
    <div class="h-24">
      <nuxt-link to="/playlist/likes" class="space-y-1 text-xs">
        <div
          class="flex justify-center items-center aspect-square bg-gradient-to-tr from-[#0061FF] to-[#60EFFF] rounded"
        >
          <Icon name="ph:heart-fill" class="size-10" />
        </div>

        <p>Liked Songs</p>
        <p class="text-white/60">Playlist - 0 songs</p>
      </nuxt-link>
    </div>
  </div>
</template>
