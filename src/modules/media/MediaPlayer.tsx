import { FC, useEffect, useState } from 'react'

import cs from 'classnames'
import useSound from 'use-sound'

import NextIcon from '@/assets/images/media/next.svg'
import PauseIcon from '@/assets/images/media/pause.svg'
import PlayIcon from '@/assets/images/media/play.svg'
import PrevIcon from '@/assets/images/media/prev.svg'
import { IMedia } from '@/utils/types/media'

import { Loader } from '@/components/Loader'
import css from './MediaPlayer.module.scss'

export type MediaPlayerProps = {
    entryInfo?: IMedia;
    className?: any;
};

export const MediaPlayer: FC<MediaPlayerProps> = (props) => {
    const { entryInfo, className } = props;

    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // добавлено состояние загрузки
    const [time, setTime] = useState({
        min: '',
        sec: '',
    });
    const [currTime, setCurrTime] = useState({
        min: '',
        sec: '',
    });

    const [seconds, setSeconds] = useState<number | undefined>();

    const [play, { pause, duration, sound }] = useSound(entryInfo?.url, {
        onload: () => setIsLoading(false), // изменяем состояние загрузки после загрузки
        onplay: () => setIsPlaying(true),
        onend: () => setIsPlaying(false),
    });

    useEffect(() => {
        if (duration) {
            const sec = duration / 1000;
            const min = Math.floor(Number(sec) / 60);
            const secRemain = Math.floor(sec % 60);
            setTime({
                min: `${min}`,
                sec: `${secRemain}`,
            });
        }
    }, [duration]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound && sound.playing()) {
                const currentSeconds = sound.seek() as number;
                setSeconds(currentSeconds);
                const min = Math.floor(currentSeconds / 60);
                const sec = Math.floor(currentSeconds % 60);
                setCurrTime({
                    min: `${min}`,
                    sec: `${sec < 10 ? '0' : ''}${sec}`, // Добавляем 0 перед секундами если меньше 10
                });
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    const playingButton = () => {
        if (sound) {
            if (isPlaying) {
                pause();
                setIsPlaying(false);
            } else {
                play();
                setIsPlaying(true);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.stop(); // Останавливаем воспроизведение
            }
        };
    }, [sound]);

    return (
        <>
            <div className={cs(css.mediaPlayer, className)} data-index={entryInfo?.id}>
                <div className={css.mediaTitle}>
                    <div className={css.title}>{entryInfo?.name}</div>
                </div>
            </div>
            <div className={css.mediaDuration}>
                <div className={css.progressBarContainer}>
                    <div
                        className={css.progressBar}
                        style={{ width: `${seconds && duration ? (seconds / duration) * 100 : 0}%` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max={Number(duration) / 1000}
                        defaultValue="0"
                        value={seconds}
                        className={css.timeline}
                        onChange={(e) => {
                            sound.seek([e.target.value]);
                        }}
                    />
                </div>
                <div className={css.time}>
                    <p>
                        {currTime.min}:{currTime.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                </div>

                <div className={css.controlsPlay}>
                    <button>
                        <div className={css.prevButton}>
                            <PrevIcon />
                        </div>
                    </button>
                    {isLoading ? ( // отображаем лоадер пока загружаем
                        <button className={css.playButton}>
                            <Loader />
                        </button>
                    ) : !isPlaying ? (
                        <button className={css.playButton} onClick={playingButton}>
                            <PauseIcon />
                        </button>
                    ) : (
                        <button className={css.playButton} onClick={playingButton}>
                            <PlayIcon />
                        </button>
                    )}
                    <button>
                        <div className={css.nextButton}>
                            <NextIcon />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};