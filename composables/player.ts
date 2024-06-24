import type { Player } from '~/assets/types/player'
import {} from 'module'
import { defineStore } from 'pinia'

export const usePlayer = defineStore('useAudio', () => {
  const current = reactive({
    id: '',
  })

  return { current }
})

export const useAudioID = () => useState<string>('useAudioID', () => '')

export function updateMediaSession() {
  const player = inject<Player>('usePlayer')

  if (!player?.current || !('mediaSession' in navigator)) return

  navigator.mediaSession.metadata = new MediaMetadata({
    title: player.current.title,
    artist: 'Nat King Cole',
    album: player.current.album.name,
    artwork: player.current.thumbnails.map((t) => ({src: t.url, sizes: `${t.width}x${}`})),
    a: [
      {
        src: 'https://dummyimage.com/96x96',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/128x128',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/192x192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/256x256',
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/384x384',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: 'https://dummyimage.com/512x512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  })
}

export function setMediaSession(callbacks?: Record<MediaSessionAction, () => void>) {
  if (!callbacks || !('mediaSession' in navigator)) return

  for (const key of Object.keys(callbacks)) {
    navigator.mediaSession.setActionHandler(key as MediaSessionAction, callbacks[key as MediaSessionAction])
  }
}
