import type { Song } from './player'

export type MusicSearchResult = {
  songs: Song[]
  continuation?: string
}
