import { string, array, boolean, object } from 'valibot'

export type UseAudio = {
  id: string
  playing: boolean
  queue: string[]
}
