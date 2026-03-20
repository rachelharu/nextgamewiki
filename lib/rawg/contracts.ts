import type { MetacriticPlatform } from '@/types/rawg';

export interface RawgGame {
  id: number;
  name: string;
  rating: number | null;
  background_image: string | null;
}

export interface RawgSearchResponse {
  count: number;
  results: RawgGame[];
}

export interface RawgGameDetailsResponse {
  id: number;
  name: string;
  background_image: string | null;
  background_image_additional: string | null;
  description_raw: string | null;
  genres: Array<{ name: string }> | null;
  publishers: Array<{ name: string }> | null;
  developers: Array<{ name: string }> | null;
  released: string | null;
  esrb_rating: { name: string } | null;
  metacritic: number | null;
  metacritic_url: string | null;
  metacritic_platforms: MetacriticPlatform[] | null;
  platforms: Array<{ platform: { name: string } }> | null;
  website: string | null;
}

export interface RawgScreenshot {
  image: string | null;
  hidden: boolean | null;
}

export interface RawgScreenshotsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgScreenshot[];
}
