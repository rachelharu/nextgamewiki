import type { GameDetails } from '@/types/rawg';
import { RAPID_API_BASE_URL, rapidApiRequestOptions } from './config';
import type { RawgGameDetailsResponse } from './contracts';
import { mapRawgGameDetails } from './mappers';

export async function fetchGameDetails(id: string): Promise<GameDetails> {
  if (!id) throw new Error('Game ID is required');

  try {
    const url = new URL(`${RAPID_API_BASE_URL}/games/${id}`);
    url.search = new URLSearchParams({
      key: process.env.RAWG_API_KEY!,
    }).toString();

    const response = await fetch(url.toString(), rapidApiRequestOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const rawDetails = await response.json() as RawgGameDetailsResponse;
    return mapRawgGameDetails(rawDetails);
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
}
