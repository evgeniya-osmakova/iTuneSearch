import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    title: string;
    image: string;
    type: string;
    artist: string;
    previewUrl: string | null;
}

const Card: React.FC<CardProps> = ({
    title,
    image,
    type,
    artist,
    previewUrl,
}) => {
    return (
        <div className={styles.card}>
            <img
                src={image}
                alt={title}
                className={styles.image}
            />

            <h3 className={styles.title}>
                {title}
            </h3>

            <p className={styles.artist}>
                {artist}
            </p>

            <p className={styles.type}>
                {type}
            </p>

            {previewUrl && (
                <audio controls className={styles.preview}>
                    <source src={previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default Card;
