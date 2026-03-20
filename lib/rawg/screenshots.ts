import type { Screenshot } from '@/types/rawg';
import { RAWG_DIRECT_BASE_URL } from './config';
import type { RawgScreenshotsResponse } from './contracts';
import { mapRawgScreenshots } from './mappers';

export async function fetchGameScreenshots(gamePk: number | string): Promise<Screenshot[]> {
  if (!gamePk) throw new Error('Game ID is required for screenshots');

  try {
    const url = new URL(`${RAWG_DIRECT_BASE_URL}/games/${gamePk}/screenshots`);
    url.search = new URLSearchParams({
      key: process.env.RAWG_API_KEY!,
    }).toString();

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Direct RAWG API error in getGameScreenshots for ${gamePk}: ${response.status} - ${errorText}`);
      throw new Error(`Direct RAWG API error: ${response.status}`);
    }

    const rawScreenshots = await response.json() as RawgScreenshotsResponse;
    return mapRawgScreenshots(rawScreenshots);
  } catch (error) {
    console.error(`Error fetching screenshots for game ${gamePk} from direct RAWG API:`, error);
    return [];
  }
}
