export const RAPID_API_BASE_URL = 'https://rawg-video-games-database.p.rapidapi.com';
export const RAWG_DIRECT_BASE_URL = 'https://api.rawg.io/api';
export const SEARCH_RESULTS_LIMIT = 15;
export const RAWG_REVALIDATE_SECONDS = 3600;

export const rapidApiRequestOptions = {
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
    'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
  },
  next: { revalidate: RAWG_REVALIDATE_SECONDS }
};
