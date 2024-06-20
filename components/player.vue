<script setup lang="ts">
import type { UseAudio } from '~/assets/types/audio'

const audioId = useAudioID()
const audioElem = ref<HTMLAudioElement>()

onMounted(() => (audioElem.value = new Audio()))

watch(audioId, async (v, pv) => {
  if (!audioElem.value) return
  if (v === pv) return

  const data = await $fetch<string>('/api/stream', { method: 'post', body: { id: v } })
  if (!data) return

  audioElem.value.pause()
  audioElem.value.src = `data:audio/wav;base64,${data}`
  audioElem.value.play()
})
</script>

<template></template>
