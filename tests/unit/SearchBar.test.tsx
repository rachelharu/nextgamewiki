import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import SearchBar from '../../features/search/SearchBar';

vi.mock('next/image', () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />
}));

vi.mock('@mantine/hooks', () => ({
  useDebouncedValue: (value: string) => [value]
}));

const pushMock = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

const searchGamesMock = vi.fn();
vi.mock('@/lib/rawg/api', () => ({
  searchGames: (...args: unknown[]) => searchGamesMock(...args)
}));

const flushPromises = async () => {
  await Promise.resolve();
  await Promise.resolve();
};

describe('SearchBar', () => {
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
    expect(pushMock).toHaveBeenCalledWith('/gameDetails/1');
  });

  it('renders games in the same order returned by searchGames', async () => {
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

    const resultButtons = await screen.findAllByRole('button');
    expect(resultButtons.map((node) => node.textContent?.trim())).toEqual([
      'Minecraft',
      'Halo Infinite',
      'Halo'
    ]);
  });
});
