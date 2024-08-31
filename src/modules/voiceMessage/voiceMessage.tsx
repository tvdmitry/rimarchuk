import { FC, useEffect, useState } from 'react';

import useSound from 'use-sound';

import VoicePlay from '@/assets/images/media/voicePause.svg';
import VoiceStop from '@/assets/images/media/voicePlay.svg';
import { Loader } from '@/components/Loader';

import css from './voiceMessage.module.scss';

interface VoiceMessageProps {
    item?: string;
    isVisible?: boolean;
}

export const VoiceMessage: FC<VoiceMessageProps> = ({ item, isVisible }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isFallback, setIsFallback] = useState(false);

    const [play, { pause, sound, stop }] = useSound(item || '', {
        onload: () => setIsLoading(false),
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
        onerror: () => {
            setIsLoading(false);
            setHasError(true);
            setIsFallback(true);
        },
    });

    const togglePlayPause = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (!isVisible) {
            pause();
            setIsPlaying(false);
            setIsLoading(false);
            setHasError(false);
        }
    }, [isVisible, pause]);

    if (isLoading) {
        return (
            <div className={css.voiceMessage}>
                <button className={css.playButton}>
                    <Loader />
                </button>
                <div className={css.info}>
                    <div className={css.title}>Марина Римарчук</div>
                    <div className={css.text}>Голосовое сообщение</div>
                </div>
            </div>
        );
    }

    if (hasError && !isFallback) {
        return <div>Ошибка загрузки аудио</div>;
    }

    return (
        <div className={css.voiceMessage}>
            {isFallback ? (
                <audio controls>
                    <source src={item} type="audio/ogg" />
                    Your browser does not support the audio element.
                </audio>
            ) : (
                <>
                    <button className={css.playButton} onClick={togglePlayPause}>
                        {isPlaying ? <VoicePlay /> : <VoiceStop />}
                    </button>
                    <div className={css.info}>
                        <div className={css.title}>Марина Римарчук</div>
                        <div className={css.text}>Голосовое сообщение</div>
                    </div>
                </>
            )}
        </div>
    );
};
