'use client';
import { useState } from 'react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="autocomplete">
            <label>
                <b className="inputTag">Search</b>
            </label>
            <input
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
            />
            {isOpen && (
                <div className="dropdown is-active">
                    <div className="dropdown-menu">
                        <div className="dropdown-content results"></div>
                    </div>
                </div>
            )}
        </div>
    );
}