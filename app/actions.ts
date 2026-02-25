'use server';

import type { Game, GameDetails, Screenshot, ScreenshotsResponse } from './actions.types';

interface ApiResponse {
  results: Game[];
  count: number;
}

const BASE_URL = 'https://rawg-video-games-database.p.rapidapi.com';

const options = {
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
  },
  next: { revalidate: 3600 }
};

const BASE_URL_RAWG_DIRECT = 'https://api.rawg.io/api';

export async function searchGames(searchTerm: string): Promise<Game[]> {
  if (!searchTerm) return [];

  try {
    const url = new URL(`${BASE_URL}/games`);
    const params = new URLSearchParams({
      key: process.env.RAWG_API_KEY!,
      search: searchTerm
    });
    url.search = params.toString();

    const response = await fetch(url.toString(), options);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json() as ApiResponse;
    const sortedResults = [...data.results].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sortedResults;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export async function getGameDetails(id: string): Promise<GameDetails> {
  if (!id) throw new Error('Game ID is required');

  try {
    const url = new URL(`${BASE_URL}/games/${id}`);
    const params = new URLSearchParams({
      key: process.env.RAWG_API_KEY!
    });
    url.search = params.toString();

    const response = await fetch(url.toString(), options);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json() as Promise<GameDetails>;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
}

export async function getGameScreenshots(gamePk: number | string): Promise<Screenshot[]> {
 if (!gamePk) throw new Error('Game ID is required for screenshots');

  try {
    const url = new URL(`${BASE_URL_RAWG_DIRECT}/games/${gamePk}/screenshots`);
    const params = new URLSearchParams({
      key: process.env.RAWG_API_KEY!
    });
    url.search = params.toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Direct RAWG API error in getGameScreenshots for ${gamePk}: ${response.status} - ${errorText}`);
      throw new Error(`Direct RAWG API error: ${response.status}`);
    }

    const data = await response.json() as ScreenshotsResponse;
    return data.results.filter(screenshot => !screenshot.hidden);
  } catch (error) {
    console.error(`Error fetching screenshots for game ${gamePk} from direct RAWG API:`, error);
    return [];
  }
}
