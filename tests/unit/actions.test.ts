import { afterEach, describe, expect, it, vi } from 'vitest';
import { getGameDetails, getGameScreenshots, searchGames } from '@/lib/rawg/api';

const mockFetch = vi.fn();

describe('lib/rawg/api', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    mockFetch.mockReset();
  });

  it('returns empty list when search term is empty', async () => {
    const results = await searchGames('');
    expect(results).toEqual([]);
  });

  it('sorts search results by rating descending', async () => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 3,
        results: [
          { id: 1, name: 'Low', rating: 2.1, background_image: 'a' },
          { id: 2, name: 'High', rating: 4.8, background_image: 'b' },
          { id: 3, name: 'Mid', rating: 3.4, background_image: 'c' },
        ],
      }),
    } as Response);

    const results = await searchGames('halo');

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(results.map((game) => game.name)).toEqual(['High', 'Mid', 'Low']);
  });

  it('returns empty list when search request fails', async () => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const results = await searchGames('halo');
    expect(results).toEqual([]);
  });

  it('throws when getGameDetails is called without id', async () => {
    await expect(getGameDetails('')).rejects.toThrow('Game ID is required');
  });

  it('throws when getGameDetails api returns non-ok', async () => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(getGameDetails('123')).rejects.toThrow('API error: 404');
  });

  it('filters hidden screenshots', async () => {
    vi.stubGlobal('fetch', mockFetch);
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        count: 2,
        next: null,
        previous: null,
        results: [
          { image: 'visible.png', hidden: false },
          { image: 'hidden.png', hidden: true },
        ],
      }),
    } as Response);

    const screenshots = await getGameScreenshots(123);
    expect(screenshots).toEqual([{ image: 'visible.png', hidden: false }]);
  });
});
