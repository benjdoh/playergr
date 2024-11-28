import { string, object, array, type InferInput, number } from "valibot";

export const SongSchema = object({
  id: string(),
  title: string(),
  thumbnails: array(
    object({
      url: string(),
      width: number(),
      height: number(),
    })
  ),
  artists: array(
    object({
      id: string(),
      name: string(),
    })
  ),
  album: object({
    id: string(),
    name: string(),
  }),
});

export type Song = InferInput<typeof SongSchema>;

export type Player = {
  current: Song | null;
  playing: boolean;
  volume: number;
  queue: Song[];
};

export type SearchFilter =
  | "songs"
  | "videos"
  | "albums"
  | "playlists"
  | "artists"
  | "podcasts"
  | "episodes"
  | "profiles";
