import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { describe, it, expect } from 'vitest';
import DetailsCard from '../../features/game-details/components/DetailsCard';

describe('DetailsCard', () => {
    it('renders core rows from props', () => {
        render(
            <MantineProvider>
                <DetailsCard
                    genres={[{ name: 'RPG'}]}
                    platforms={[{ name: 'PC' }]}
                    releaseDate="Jan 1, 2020"
                    publishers={['Square Enix']}
                    developers={['Square Enix']}
                    esrb_rating="M"
                    website="https://example.com"
                />
            </MantineProvider>
        );
        expect(screen.getByText('Genre:')).toBeInTheDocument();
        expect(screen.getByText('Platforms:')).toBeInTheDocument();
        expect(screen.getByText('Release date:')).toBeInTheDocument();
        expect(screen.getByText('Company:')).toBeInTheDocument();
        expect(screen.getByText('ESRB:')).toBeInTheDocument();
        expect(screen.getByText('Links:')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'https://example.com' })).toHaveAttribute(
            'href',
            'https://example.com'
        );
    });
    
    it('omits rows with missing data', () => {
        render(
            <MantineProvider>
                <DetailsCard
                    genres={[]}
                    platforms={[]}
                    releaseDate=""
                    publishers={[]}
                    developers={[]}
                    esrb_rating=""
                    website=""
                />
            </MantineProvider>
        );
        expect(screen.queryByText('Genre:')).toBeNull();
        expect(screen.queryByText('Platforms:')).toBeNull();
    });
});
