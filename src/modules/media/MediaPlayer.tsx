import { FC, useEffect, useState } from 'react'

import cs from 'classnames'

import NextIcon from '@/assets/images/media/next.svg'
import PauseIcon from '@/assets/images/media/pause.svg'
import PlayIcon from '@/assets/images/media/play.svg'
import PrevIcon from '@/assets/images/media/prev.svg'
import { Loader } from '@/components/Loader'
import { IMedia } from '@/utils/types/media'

import { useNavigate } from 'react-router-dom'
import css from './MediaPlayer.module.scss'
import { audioCache } from './PreloadPodcast'

export type MediaPlayerProps = {
    entryInfo?: IMedia;
    className?: any;
};

export const MediaPlayer: FC<MediaPlayerProps> = (props) => {
    const { entryInfo, className } = props;
    const navigate = useNavigate();
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

    const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined);

    useEffect(() => {
        if (entryInfo?.url && audioCache[entryInfo?.url]) {
            const cachedAudio = audioCache[entryInfo?.url];
            setAudio(cachedAudio);
            setIsLoading(false);

            const onTimeUpdate = () => {
                const currentSecs = cachedAudio.currentTime;
                setSeconds(currentSecs);
                const min = Math.floor(currentSecs / 60);
                const sec = Math.floor(currentSecs % 60);
                setCurrTime({
                    min: `${min}`,
                    sec: `${sec < 10 ? '0' : ''}${sec}`,
                });
            };
            const onLoadedData = () => {
                const sec = cachedAudio.duration;
                const min = Math.floor(sec / 60);
                const secRemain = Math.floor(sec % 60);
                setTime({
                    min: `${min}`,
                    sec: `${secRemain}`,
                });
            };
            cachedAudio.addEventListener('timeupdate', onTimeUpdate);
            cachedAudio.addEventListener('loadedmetadata', onLoadedData);
            return () => {
                cachedAudio.removeEventListener('timeupdate', onTimeUpdate);
                cachedAudio.removeEventListener('loadedmetadata', onLoadedData);
            };
        }
    }, [entryInfo]);

    // useEffect(() => {
    //     if (duration) {
    //         const sec = duration / 1000;
    //         const min = Math.floor(Number(sec) / 60);
    //         const secRemain = Math.floor(sec % 60);
    //         setTime({
    //             min: `${min}`,
    //             sec: `${secRemain}`,
    //         });
    //     }
    // }, [duration]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if (sound && sound.playing()) {
    //             const currentSeconds = sound.seek() as number;
    //             setSeconds(currentSeconds);
    //             const min = Math.floor(currentSeconds / 60);
    //             const sec = Math.floor(currentSeconds % 60);
    //             setCurrTime({
    //                 min: `${min}`,
    //                 sec: `${sec < 10 ? '0' : ''}${sec}`, // Добавляем 0 перед секундами если меньше 10
    //             });
    //         }
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [sound]);

    const playingButton = () => {
        if (audio) {
            audio.load();
            try {
                if (isPlaying) {
                    audio.pause();
                    setIsPlaying(false);
                } else {
                    audio.play();
                    setIsPlaying(true);
                }
            } catch (err) {
                console.error('Error playing audio:', err);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (audio) {
                audio.pause(); // Останавливаем воспроизведение
                audio.currentTime = 0; // Сбрасываем текущее время
                setIsPlaying(false);
            }
        };
    }, [audio]);

    const onPrevClick = () => {
        navigate(`/mediaPodcast/${Number(entryInfo?.id) - 1}`);
    };

    const onNextClick = () => {
        navigate(`/mediaPodcast/${Number(entryInfo?.id) + 1}`);
    };

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
                        style={{ width: `${seconds && audio?.duration ? (seconds / audio.duration) * 100 : 0}%` }}
                    />
                    <input
                        type="range"
                        min="0"
                        max={audio?.duration}
                        defaultValue="0"
                        value={seconds}
                        className={css.timeline}
                        onChange={(e) => {
                            if (audio) {
                                audio.currentTime = Number(e.target.value);
                            }
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
                    <button type="button" onClick={onPrevClick}>
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
                        <button type="button" className={css.playButton} onClick={playingButton}>
                            <PlayIcon />
                        </button>
                    )}
                    <button type="button" onClick={onNextClick}>
                        <div className={css.nextButton}>
                            <NextIcon />
                        </div>
                    </button>
                </div>
            </div>
        </>
    );
};
