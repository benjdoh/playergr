<script setup lang="ts">
import { extractColorsFromSrc } from "extract-colors";
import { useSwipe } from "@vueuse/core";

const audio_player = useAudioPlayer();
const imageColor = shallowRef<FinalColor>();

audio_player.$subscribe(
  async (e, { current }) => {
    if (!current) return (imageColor.value = undefined);

    imageColor.value = (
      await extractColorsFromSrc(current.thumbnails[0].url)
    )[0];
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="h-16 flex relative rounded-md gap-4 p-2 pr-4"
    :style="{
      background: `rgba(${imageColor?.red}, ${imageColor?.green}, ${imageColor?.blue}, 0.420)`,
    }"
  >
    <div class="flex-grow overflow-hidden">
      <carousel
        :items-to-show="1"
        class="h-full flex-grow max-w-max"
        snapAlign="start"
      >
        <slide v-for="slide in 5" :key="slide" class="h-full">
          <div
            class="h-12 w-full flex justify-start gap-2 text-left text-nowrap"
          >
            <img
              class="h-12 rounded"
              :src="audio_player?.current?.thumbnails[1].url"
              :alt="`${audio_player?.current?.album.name} artwork`"
            />

            <div>
              <div>{{ audio_player?.current?.title }}</div>
              <div class="text-white/50">
                <template
                  v-for="(artist, index) in audio_player?.current?.artists ||
                  []"
                  :key="artist.id"
                >
                  <span>{{ artist.name }}</span>
                  <span
                    v-if="
                      index < (audio_player?.current?.artists.length ?? 1) - 1
                    "
                    class="pr-1"
                  >
                    ,
                  </span>
                </template>
              </div>
            </div>
          </div>
        </slide>
      </carousel>
    </div>

    <!-- <div
        class="overflow-x-auto whitespace-nowrap snap-x snap-mandatory h-full flex-grow"
      >
        <div
          :class="[
            'text-white overflow-hidden flex-grow w-full h-full flex gap-2 text-nowrap overflow-hidden',
          ]"
        ></div>
      </div> -->

    <button>
      <Icon
        :name="audio_player.timestamp > -1 ? 'ph:heart' : 'ph:heart-fill'"
        class="size-6"
      />
    </button>

    <button @click="audio_player.togglePlaying">
      <Icon
        :name="audio_player.isPlaying ? 'ph:pause-fill' : 'ph:play-fill'"
        class="size-6"
      />
    </button>

    <div
      :class="[
        'w-full absolute left-0 px-2 -bottom-3px transform -translate-y-1/2',
      ]"
    >
      <span class="h-3px w-full bg-light-900/50 block rounded">
        <div class="h-full rounded w-1/2 bg-white"></div>
      </span>
    </div>
  </div>
</template>
