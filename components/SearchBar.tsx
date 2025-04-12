'use client';
import { searchGames, type Game } from '@/app/actions';
import { useState } from 'react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState<Game[]>([]);

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

    const handGameSelect = (game: Game) => {
        setIsOpen(false);
        setSearchTerm(game.name);
        window.location.href = `/game/${game.id}`;
    };

    return (
        <div className="autocomplete">
            <label>
                <b className="inputTag">Search</b>
            </label>
            <input
              className="input"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
            {isOpen && results.length > 0 && (
                <div className="dropdown is-active">
                    <div className="dropdown-menu">
                        <div className="dropdown-content results">
                            {results.map((game) => (
                                <a
                                    key={game.id}
                                    className="dropdown-item"
                                    onClick={() => handGameSelect(game)}
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