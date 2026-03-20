'use server';

import type { Game, GameDetails, Screenshot } from '@/types/rawg';
import { fetchGameDetails } from './details';
import { fetchSearchGames } from './search';
import { fetchGameScreenshots } from './screenshots';

export async function searchGames(searchTerm: string): Promise<Game[]> {
  return fetchSearchGames(searchTerm);
}

export async function getGameDetails(id: string): Promise<GameDetails> {
  return fetchGameDetails(id);
}

export async function getGameScreenshots(gamePk: number | string): Promise<Screenshot[]> {
  return fetchGameScreenshots(gamePk);
}
