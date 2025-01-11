import React, { useEffect, useRef, useState } from 'react'
import styles from './Card.module.css';

interface CardProps {
    title: string;
    trackId: number;
    image: string;
    type: string;
    artist: string;
    previewUrl: string | null;
    setCurrentPlaying: (value: number | null) => void;
    shouldPlay: boolean;
}

const Card: React.FC<CardProps> = ({
    title,
    image,
    type,
    artist,
    previewUrl,
    setCurrentPlaying,
    trackId,
    shouldPlay
}) => {
    const [wasStopped, setWasStopped] = useState(false);
    const audio = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!shouldPlay) {
            setWasStopped(true)
            audio?.current?.pause()
        }
    }, [shouldPlay])

    const onPlayClick = () => {
        setCurrentPlaying(trackId)
    }

    const onPauseClick = () => {
        if (!wasStopped) {
            setCurrentPlaying(null)
        }

        setWasStopped(false)
    }

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
                <audio
                    controls
                    ref={audio}
                    onPlay={onPlayClick}
                    onPause={onPauseClick}
                >
                    <source src={previewUrl} type="audio/mpeg" />

                    Your browser does not support the audio element.
                </audio>
            )}
        </div>
    );
};

export default Card;
