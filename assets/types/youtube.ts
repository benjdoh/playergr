import type { Song } from "./player";

export type MusicSearchResult = {
  songs: Omit<Song, "audio">[];
  continuation?: string;
};

export interface StreamingData {
  itag: number;
  mime_type: string;
  is_type_otf: boolean;
  bitrate: number;
  average_bitrate: number;
  projection_type: string;
  init_range: InitRangeOrIndexRange;
  index_range: InitRangeOrIndexRange;
  last_modified: string;
  last_modified_ms: string;
  content_length: number;
  quality: string;
  signature_cipher: string;
  audio_quality: string;
  approx_duration_ms: number;
  audio_sample_rate: number;
  audio_channels: number;
  loudness_db: number;
  has_audio: boolean;
  has_video: boolean;
  has_text: boolean;
  high_replication: boolean;
  language?: null;
  is_drc: boolean;
  is_dubbed: boolean;
  is_descriptive: boolean;
  is_secondary: boolean;
  is_original: boolean;
  url: string;
}
export interface InitRangeOrIndexRange {
  start: number;
  end: number;
}
