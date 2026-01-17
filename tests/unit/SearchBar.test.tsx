import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SearchBar from '../../components/SearchBar';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
}));

vi.mock('@mantine/hooks', () => ({
  useDebouncedValue: (value: string) => [value]
}));

const searchGamesMock = vi.fn();
vi.mock('@/app/actions', () => ({
  searchGames: (...args: unknown[]) => searchGamesMock(...args)
}));

const setWindowLocation = () => {
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true
  });
};

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('SearchBar', () => {
  beforeEach(() => {
    setWindowLocation();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('searches after debounce and navigates on selection', async () => {
    searchGamesMock.mockResolvedValue([
      {
        id: 1,
        name: 'Halo',
        rating: 4.5,
        background_image: '/halo.jpg'
      }
    ]);

    render(<SearchBar variant="default" />);
    const input = screen.getByPlaceholderText('Search');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'halo' } });
      await flushPromises();
    });

    expect(searchGamesMock).toHaveBeenCalledWith('halo');
    const result = await screen.findByText('Halo');

    await act(async () => {
      fireEvent.click(result);
      await flushPromises();
    });
    expect(window.location.href).toBe('/gameDetails/1');
  });

  it('prioritizes exact match then starts-with match', async () => {
    searchGamesMock.mockResolvedValue([
      {
        id: 2,
        name: 'Minecraft',
        rating: 4.0,
        background_image: '/mc.jpg'
      },
      {
        id: 3,
        name: 'Halo Infinite',
        rating: 4.2,
        background_image: '/hi.jpg'
      },
      {
        id: 4,
        name: 'Halo',
        rating: 4.8,
        background_image: '/halo.jpg'
      }
    ]);

    render(<SearchBar variant="default" />);
    const input = screen.getByPlaceholderText('Search');

    await act(async () => {
      fireEvent.change(input, { target: { value: 'halo' } });
      await flushPromises();
    });

    const headings = await screen.findAllByRole('heading', { level: 1 });
    expect(headings.map((node) => node.textContent)).toEqual([
      'Halo',
      'Halo Infinite',
      'Minecraft'
    ]);
  });
});
