<script setup lang="ts">
import { extractColorsFromSrc } from "extract-colors";
const player = usePlayer();
const imageColor = shallowRef<FinalColor>();

watch(toRef(player, "current"), async (current) => {
  if (!current) return (imageColor.value = undefined);

  imageColor.value = (await extractColorsFromSrc(current.thumbnails[0].url))[3];
});
</script>

<template>
  <div
    :class="[
      'fixed bottom-16 w-full h-16 z-20 px-2',
      player?.current ? '' : 'hidden',
    ]"
  >
    <div
      :class="[
        'text-white overflow-hidden w-full h-full flex gap-2 bg-black p-2 rounded-md text-nowrap overflow-hidden',
      ]"
      :style="{ background: imageColor?.hex }"
    >
      <img
        class="h-full rounded"
        :src="player?.current?.thumbnails[1].url"
        :alt="`${player?.current?.album.name} artwork`"
      />

      <div>
        <div>{{ player?.current?.title }}</div>
        <div class="text-white/50">
          <template
            v-for="(artist, index) in player?.current?.artists || []"
            :key="artist.id"
          >
            <span>{{ artist.name }}</span>
            <span v-if="index < (player?.current?.artists.length ?? 1) - 1"
              >,</span
            >
          </template>
        </div>
      </div>
    </div>

    <div
      :class="[
        'w-full absolute left-0 px-4 -bottom-0.5 h-0.5 -translate-y-1/2',
      ]"
    >
      <span class="h-full w-full bg-light-900 block rounded" />
    </div>
  </div>
</template>
