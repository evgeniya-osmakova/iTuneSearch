import React from 'react';
import Card from '../Card/Card.tsx';
import styles from './ResultList.module.css';

interface ResultListProps {
    results: {
        trackName: string;
        artworkUrl100: string;
        kind: string;
        artistName: string;
        previewUrl: string | null;
    }[];
}

const ResultList: React.FC<ResultListProps> = ({ results }) => {
    return (
        <div className={styles.resultList}>
            {results.map((result, index) => (
                <Card
                    key={index}
                    title={result.trackName}
                    image={result.artworkUrl100}
                    type={result.kind}
                    artist={result.artistName}
                    previewUrl={result.previewUrl}
                />
            ))}
        </div>
    );
};

export default ResultList;
