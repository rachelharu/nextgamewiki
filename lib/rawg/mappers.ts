import type { Game, GameDetails, Screenshot } from '@/types/rawg';
import type {
  RawgGame,
  RawgGameDetailsResponse,
  RawgScreenshotsResponse,
} from './contracts';

export function mapRawgGame(rawGame: RawgGame): Game {
  return {
    id: rawGame.id,
    name: rawGame.name,
    rating: rawGame.rating ?? 0,
    background_image: rawGame.background_image ?? '',
  };
}

export function mapRawgGameDetails(rawDetails: RawgGameDetailsResponse): GameDetails {
  return {
    id: rawDetails.id,
    name: rawDetails.name,
    background_image: rawDetails.background_image ?? '',
    background_image_additional: rawDetails.background_image_additional ?? '',
    description_raw: rawDetails.description_raw ?? 'No description available.',
    genres: rawDetails.genres ?? [],
    publishers: rawDetails.publishers ?? [],
    developers: rawDetails.developers ?? [],
    released: rawDetails.released ?? 'N/A',
    esrb_rating: rawDetails.esrb_rating ?? null,
    metacritic: rawDetails.metacritic ?? null,
    metacritic_url: rawDetails.metacritic_url ?? '',
    metacritic_platforms: rawDetails.metacritic_platforms ?? [],
    platforms: rawDetails.platforms ?? [],
    website: rawDetails.website ?? '',
  };
}

export function mapRawgScreenshots(rawResponse: RawgScreenshotsResponse): Screenshot[] {
  return rawResponse.results
    .filter((screenshot) => !screenshot.hidden && !!screenshot.image)
    .map((screenshot) => ({
      image: screenshot.image as string,
      hidden: screenshot.hidden ?? false,
    }));
}
