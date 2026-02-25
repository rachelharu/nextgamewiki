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

    const isNavbar = variant === 'navbar';

    const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);

    useEffect(() => {
        const performSearch = async () => {
            if (!debouncedSearchTerm.trim()) {
                setResults([]);
                setIsOpen(false);
                setIsLoading(false);
                setError(null);
                return;
            }
            setIsLoading(true);
            setError(null);
            setIsOpen(true);

        try {
            const games = await searchGames(debouncedSearchTerm);
            setResults(games.slice(0, 20));
        } catch (err) {
            console.error('Search failed:', err);
                setError("Failed to load games. Please try again.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };
        performSearch();
    }, [debouncedSearchTerm]);

    const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value.length >= 3 ) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
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
                            {!isLoading && !error && results.length === 0 && (
                                <div className="dropdown-item">No games found.</div>
                            )}
                            {!isLoading && !error && results.map((game) => (
                                <a
                                    key={game.id}
                                    className="dropdown-item"
                                    onClick={() => handleGameSelect(game)}
                                >
                                    <Image src={game.background_image} 
                                        alt={game.name} 
                                        width={50} 
                                        height={50} 
                                        style={{ objectFit: 'cover'}} />
                                    <h1>{game.name}</h1>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
