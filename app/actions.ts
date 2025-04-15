'use server';

export interface Game {
  id: number;
  name: string;
  rating: number;
  background_image: string;
}

export interface GameDetails {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
  genres: Array<{ name: string }>;
  publishers: Array<{ name: string }>;
  developers: Array<{ name: string }>;
  released: string;
  esrb_rating: { name: string } | null;
  metacritic: number | null;
  metacritic_url: string;
  platforms: Array<{ platform: { name: string } }>;
}


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
    return data.results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
}

export async function getGameDetails(id: string) {
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

    return response.json();
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
}