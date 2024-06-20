import type { UseAudio } from '~/assets/types/audio'

export const useAudio = () =>
  useState<UseAudio>('useAudio', () => ({
    id: '',
    playing: false,
    queue: [],
  }))

export const useAudioID = () => useState<string>('useAudioID', () => '')
