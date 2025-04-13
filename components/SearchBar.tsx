'use client';
import { searchGames, type Game } from '@/app/actions';
import { useState } from 'react';

interface SearchBarProps {
    variant: 'navbar' | 'default';
  }

export default function SearchBar({ variant }: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Game[]>([]);
    const isNavbar = variant === 'navbar';

    const handleSearch = async (value: string) => {
        setSearchTerm(value);
        if (value.length < 3 ) return;

        try {
            const games = await searchGames(value);
            console.log('Search results:', games);
            setResults(games);
            setIsOpen(true);
        } catch (error) {
            console.error('Search failed:', error);
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
                <b className="inputTag">Search</b>
            </label>
        )}
        <input
            className={`input ${isNavbar ? 'is-small' : ''}`}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={isNavbar ? 'Search games...' : ''}
        />
            {isOpen && results.length > 0 && (
                <div className="dropdown is-active">
                    <div className="dropdown-menu">
                        <div className="dropdown-content results">
                            {results.map((game) => (
                                <a
                                    key={game.id}
                                    className="dropdown-item"
                                    onClick={() => handleGameSelect(game)}
                                >
                                    <img src={game.background_image} alt={game.name} />
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