import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import styles from './SearchBar.module.css';

interface SearchBarProps {
    onSearch: (query: string) => void;
    onMediaTypeChange: (type: string) => void;
    mediaType: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    onMediaTypeChange,
    mediaType,
}) => {
    const [query, setQuery] = useState('');

    const debouncedSearch = useCallback(
        debounce((criteria: string) => {
            if (criteria.length < 3) {
                return
            }

            onSearch(criteria);
        }, 1000),
        [onSearch]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setQuery(newValue);

        debouncedSearch(newValue);
    };

    const handleMediaTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value;

        onMediaTypeChange(selectedType);
    };

    return (
        <div className={ styles.searchBar }>
            <input
                placeholder="Search for music"
                value={ query }
                onChange={ handleInputChange }
                className={ styles.input }
            />

            <div className={ styles.selectWrapper }>
                <label htmlFor="mediaType" className={ styles.label }>
                    Filter by:
                </label>

                <select
                    id="mediaType"
                    value={ mediaType }
                    onChange={ handleMediaTypeSelect }
                    className={ styles.select }
                >
                    <option value="all">All</option>
                    <option value="music">Music</option>
                    <option value="movie">Movies</option>
                    <option value="podcast">Podcasts</option>
                    <option value="audiobook">Audiobooks</option>
                    <option value="ebook">E-books</option>
                </select>
            </div>

            <div className={ styles.hint }>
                Please enter at least 3 characters to start searching.
            </div>
        </div>
    );
};

export default SearchBar;
