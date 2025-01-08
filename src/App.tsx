import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import ResultList from './components/ResultList/ResultList.tsx';
import { fetchMedia } from './api/fetchMedia';
import { isObject } from 'lodash'

import styles from './App.module.css';

const App: React.FC = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [mediaType, setMediaType] = useState('all');
    const [page, setPage] = useState(1);

    const handleSearch = async (searchQuery: string, type: string, newPage = 1) => {
        const RESULTS_PER_PAGE = 10;

        setLoading(true);

        setError('');

        try {
            const offset = (newPage - 1) * RESULTS_PER_PAGE;
            const data = await fetchMedia(searchQuery, type, RESULTS_PER_PAGE, offset);

            setResults(data.results);
            setPage(newPage);
            setQuery(searchQuery);
        } catch (err) {
            const error = isObject(err) && 'message' in err
                ? err.message
                : 'Something went wrong';

            setError(typeof error === 'string' ? error : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = async () => {
        await handleSearch(query, mediaType, page + 1);
    };

    const handlePreviousPage = async () => {
        if (page > 1) {
            await handleSearch(query, mediaType, page - 1);
        }
    };

    const handleMediaTypeChange = async (type: string) => {
        setMediaType(type);

        if (query) {
            await handleSearch(query, type, 1);
        }
    };

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <h1 className={styles.headerTitle}>Search Media App</h1>

                <SearchBar
                    onSearch={(searchQuery) => handleSearch(searchQuery, mediaType)}
                    onMediaTypeChange={handleMediaTypeChange}
                    mediaType={mediaType}
                />
            </header>

            <main className={styles.main}>
                { loading && (
                    <div className={styles.loading}>Loading...</div>
                ) }

                { error && (
                    <div className={styles.error}>{ error }</div>
                ) }

                { !loading && !error && (
                    <>
                        <ResultList results={ results }/>

                        {results.length > 0 && (
                            <div className={styles.pagination}>
                                <button
                                    className={styles.paginationButton}
                                    onClick={handlePreviousPage}
                                    disabled={page === 1}
                                >
                                    Previous
                                </button>
                                <span className={styles.paginationInfo}>Page {page}</span>
                                <button className={styles.paginationButton} onClick={handleNextPage}>
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                ) }
            </main>
        </div>
    );
};

export default App;
