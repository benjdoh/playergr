import {
  string,
  object,
  array,
  type InferInput,
  number,
  union,
  custom,
} from "valibot";

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
  duration: number(),
  audio: custom<HTMLAudioElement>((v) => {
    return typeof v === "object" && !!v && "src" in v;
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
