import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchHero from '../../components/SearchHero';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

describe('SearchHero', () => {
    it('renders the heading and subtitle', () => {
        render(<SearchHero />);
        expect(screen.getByRole('heading', {name: /game lookup/i })).toBeInTheDocument();
        expect(screen.getByText(/find info about video games/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    });
});
