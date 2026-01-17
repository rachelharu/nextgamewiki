import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SearchHero from '../../components/SearchHero';

describe('SearchHero', () => {
    it('renders the heading and subtitle', () => {
        render(<SearchHero />);
        expect(screen.getByRole('heading', {name: /game lookup/i })).toBeInTheDocument();
        expect(screen.getByText(/find info about video games/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();

    });
});