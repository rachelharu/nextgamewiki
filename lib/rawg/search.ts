import type { Game } from '@/types/rawg';
import { RAPID_API_BASE_URL, SEARCH_RESULTS_LIMIT, rapidApiRequestOptions } from './config';
import type { RawgSearchResponse } from './contracts';
import { mapRawgGame } from './mappers';

export async function fetchSearchGames(searchTerm: string): Promise<Game[]> {
  if (!searchTerm) return [];

  try {
    const url = new URL(`${RAPID_API_BASE_URL}/games`);
    url.search = new URLSearchParams({
      key: process.env.RAWG_API_KEY!,
      search: searchTerm,
      page: '1',
      page_size: String(SEARCH_RESULTS_LIMIT),
    }).toString();

    const response = await fetch(url.toString(), rapidApiRequestOptions);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json() as RawgSearchResponse;
    const mappedResults = data.results.map(mapRawgGame);
    const sortedResults = mappedResults.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return sortedResults.slice(0, SEARCH_RESULTS_LIMIT);
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}
