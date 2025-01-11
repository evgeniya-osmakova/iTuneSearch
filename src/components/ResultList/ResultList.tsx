import React, { useState } from 'react'
import Card from '../Card/Card.tsx';
import styles from './ResultList.module.css';

interface ResultListProps {
    results: {
        trackName: string;
        trackId: number;
        artworkUrl100: string;
        kind: string;
        artistName: string;
        previewUrl: string | null;
    }[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
    const [currenPlaying, setCurrentPlaying] = useState<number | null>(null);

    return (
        <div className={styles.resultList}>
            {results.length === 0 && (
                <h3>No items</h3>
            )}

            {results.map((result) => (
                <Card
                    key={result.trackId}
                    trackId={result.trackId}
                    title={result.trackName}
                    image={result.artworkUrl100}
                    type={result.kind}
                    artist={result.artistName}
                    previewUrl={result.previewUrl}
                    setCurrentPlaying={setCurrentPlaying}
                    shouldPlay={currenPlaying === result.trackId}
                />
            ))}
        </div>
    );
};

export default ResultList;
