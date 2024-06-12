export type Song = {
  name: string
  id: string
  artists: Array<{ id: string; name: string }>
  thumbnails: Array<{ url: string; width: number; height: number }>
  album: {
    id: string
    name: string
  }
}

export type MusicSearchResult = {
  songs: Song[]
  continuation?: string
}
