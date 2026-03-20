export interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
}

export interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface GameDetails {
  id: number;
  name: string;
  background_image: string;
  background_image_additional: string;
  description_raw: string;
  genres: Array<{ name: string }>;
  publishers: Array<{ name: string }>;
  developers: Array<{ name: string }>;
  released: string;
  esrb_rating: { name: string } | null;
  metacritic: number | null;
  metacritic_url: string;
  metacritic_platforms: MetacriticPlatform[];
  platforms: Array<{ platform: { name: string } }>;
  website: string;
}

export interface Screenshot {
  image: string;
  hidden: boolean;
}
