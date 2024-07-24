import { useState } from 'react'

import VoicePlay from '@/assets/images/media/voicePause.svg'
import VoiceStop from '@/assets/images/media/voicePlay.svg'
import { Loader } from '@/components/Loader'

import css from './voiceMessage.module.scss'

export const VoiceMessage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const playingButton = () => {
        if (isPlaying) {
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
        }
    };
    return (
        <div className={css.voiceMessage}>
            {isLoading ? ( // отображаем лоадер пока загружаем
                <button className={css.playButton}>
                    <Loader />
                </button>
            ) : !isPlaying ? (
                <button className={css.playButton} onClick={playingButton}>
                    <VoiceStop />
                </button>
            ) : (
                <button type="button" className={css.playButton} onClick={playingButton}>
                    <VoicePlay />
                </button>
            )}
            <div className={css.info}>
                <div className={css.title}>Марина Римарчук</div>
                <div className={css.text}>Голосовое сообщение</div>
            </div>
        </div>
    );
};
