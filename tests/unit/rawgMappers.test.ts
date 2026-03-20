import { describe, expect, it } from 'vitest';
import { mapRawgGameDetails, mapRawgScreenshots } from '@/lib/rawg/mappers';

describe('lib/rawg/mappers', () => {
  it('normalizes nullable game details fields', () => {
    const mapped = mapRawgGameDetails({
      id: 1,
      name: 'Test Game',
      background_image: null,
      background_image_additional: null,
      description_raw: null,
      genres: null,
      publishers: null,
      developers: null,
      released: null,
      esrb_rating: null,
      metacritic: null,
      metacritic_url: null,
      metacritic_platforms: null,
      platforms: null,
      website: null,
    });

    expect(mapped.released).toBe('N/A');
    expect(mapped.website).toBe('');
    expect(mapped.background_image).toBe('');
    expect(mapped.description_raw).toBe('No description available.');
    expect(mapped.genres).toEqual([]);
    expect(mapped.platforms).toEqual([]);
  });

  it('filters out hidden and invalid screenshots', () => {
    const mapped = mapRawgScreenshots({
      count: 3,
      next: null,
      previous: null,
      results: [
        { image: 'visible.png', hidden: false },
        { image: 'hidden.png', hidden: true },
        { image: null, hidden: false },
      ],
    });

    expect(mapped).toEqual([{ image: 'visible.png', hidden: false }]);
  });
});
