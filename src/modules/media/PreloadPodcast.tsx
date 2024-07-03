import { FC, useEffect } from 'react'

import { data } from '../podcastsBlock/PodcastsBlock'

export const audioCache: { [key: string]: HTMLAudioElement } = {};

export const PreloadPodcast: FC = () => {
    useEffect(() => {
        data.forEach((podcast) => {
            if (!audioCache[podcast.url]) {
                const audio = new Audio(podcast.url);
                audio.preload = 'auto';
                audioCache[podcast.url] = audio;
            }
        });
    }, []);

    return null;
};
