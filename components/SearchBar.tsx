'use client';
import Image from 'next/image';
import { useDebouncedValue } from '@mantine/hooks';
import { searchGames } from '@/app/actions';
import type { Game } from '@/app/actions.types';
import { useState, useEffect } from 'react';


interface SearchBarProps {
    variant: 'navbar' | 'default';
  }

export default function SearchBar({ variant }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Game[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const isNavbar = variant === 'navbar';

    const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);

    useEffect(() => {
        const performSearch = async () => {
            const trimmedSearchTerm = debouncedSearchTerm.trim();
            if (trimmedSearchTerm.length < 3) {
                setResults([]);
                setIsOpen(false);
                setIsLoading(false);
                setError(null);
                setHasSearched(false);
                return;
            }

            setIsLoading(true);
            setError(null);
            setIsOpen(true);
            setHasSearched(false);

        try {
            const games = await searchGames(trimmedSearchTerm);
            setResults(games);
            setHasSearched(true);
        } catch (err) {
            console.error('Search failed:', err);
                setError("Failed to load games. Please try again.");
                setResults([]);
                setHasSearched(true);
            } finally {
                setIsLoading(false);
            }
        };
        performSearch();
    }, [debouncedSearchTerm]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const trimmedValue = value.trim();
        setSearchTerm(value);
        setIsOpen(false);
        setHasSearched(false);
        setError(null);

        if (trimmedValue.length < 3) {
            setResults([]);
        }
    };

    const handleGameSelect = (game: Game) => {
        setIsOpen(false);
        setSearchTerm(game.name);
        window.location.href = `/gameDetails/${game.id}`;
    };

    return (
        <div className={`autocomplete ${isNavbar ? 'is-small' : ''}`}>
        {!isNavbar && (
            <label>
                <b className="inputTag"></b>
            </label>
        )}
        <input
            className={`input ${isNavbar ? 'is-small' : ''}`}
            value={searchTerm}
            onChange={handleSearch}
            placeholder={isNavbar ? 'Search games...' : 'Search'}
        />
            {isOpen && (
                <div className="dropdown is-active">
                    <div className="dropdown-menu">
                        <div className="dropdown-content results">
                            {isLoading && <div className="dropdown-item">Loading games...</div>}
                            {!isLoading && error && <div className="dropdown-item">{error}</div>}
                            {!isLoading && !error && hasSearched && results.length === 0 && (
                                <div className="dropdown-item">No games found.</div>
                            )}
                            {!isLoading && !error && results.map((game) => {
                                const imageSrc = game.background_image?.trim() || '/game-control.png';
                                return (
                                    <button
                                        key={game.id}
                                        type="button"
                                        className="dropdown-item"
                                        onClick={() => handleGameSelect(game)}
                                    >
                                        <Image
                                            src={imageSrc}
                                            alt={game.name}
                                            width={50}
                                            height={50}
                                            style={{ objectFit: 'cover'}}
                                        />
                                        <span>{game.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
