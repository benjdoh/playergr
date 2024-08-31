import type { Player, Song } from '~/assets/types/player'
import { defineStore } from 'pinia'

export const useAudioPlayer = defineStore('useAudioPlayer', () => {
  if (!window) return

  const mediaSession = window?.navigator?.mediaSession
  const indexDB = useIndexedDB()

  const current = ref<Song | null>(null)
  const upnext = ref<Song[]>([])
  const queue = ref<Song[]>([])
  const history = ref<Song[]>([])
  const audio = window?.Audio ? new Audio() : null
  const player = reactive({
    playing: false,
    currentTime: 0,
  })

  if (mediaSession) {
    mediaSession.setActionHandler('play', () => (player.playing = true))
    mediaSession.setActionHandler('pause', () => (player.playing = false))
    mediaSession.setActionHandler('previoustrack', previous)
    mediaSession.setActionHandler('nexttrack', next)
    mediaSession.setActionHandler('seekbackward', () => (player.currentTime = Math.max(player.currentTime - 10, 0)))
    mediaSession.setActionHandler('seekforward', () => (player.currentTime = Math.max(player.currentTime + 10, 0)))
  }

  function next() {
    let song: Song

    if (upnext.value.length > 0) {
      song = upnext.value[0]
      upnext.value = upnext.value.slice(1)
    } else {
      song = queue.value[0]
      queue.value = queue.value.slice(1)
    }

    current.value = song || null
  }

  function previous() {
    let song: Song | null = null

    if (history.value.length > 0) {
      song = history.value[0]
      history.value = history.value.slice(1)
    }

    current.value = song
  }

  watch(current, updateMediaSession)
  watch(current, (v) => indexDB.setItem('current', JSON.stringify(v)))
  watch(upnext, (v) => indexDB.setItem('upnext', JSON.stringify(v)))
  watch(queue, (v) => indexDB.setItem('queue', JSON.stringify(v)))
  watch(history, (v) => indexDB.setItem('history', JSON.stringify(v)))

  indexDB.getItem<Song>('current').then((v) => (current.value = v))
  indexDB.getItem<Song[]>('upnext').then((v) => (upnext.value = v || []))
  indexDB.getItem<Song[]>('queue').then((v) => (queue.value = v || []))
  indexDB.getItem<Song[]>('history').then((v) => (history.value = v || []))

  return {
    audio,
    current,
    player,
    queue,
    upnext,
    history,
    next,
    previous,
  }
})

export function updateMediaSession(current: Song | null) {
  navigator.mediaSession.metadata = new MediaMetadata({
    title: current?.title || '',
    artist: current?.artists.join(', ') || '',
    album: current?.album.name || '',
    artwork: current?.thumbnails.map((t) => ({ src: t.url, sizes: `${t.width}x${t.height}` })) || [],
  })
}
