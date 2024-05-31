import React, { FC } from 'react';
import ReactPlayer from 'react-player';

import css from '@/modules/media/VideoPlayer.module.scss';

export type VideoPlayerProps = {
    videoUrl: string;
    previewUrl?: string;
    width: string;
    height: string;
};

const VideoPlayer: FC<VideoPlayerProps> = (props) => {
    const { videoUrl, previewUrl, width, height } = props;

    return (
        <div className={css.videoPlayerContainer} style={{ maxWidth: width, minHeight: height }}>
            <ReactPlayer
                url={videoUrl}
                width="100%"
                height="100%"
                controls
                className={css.reactPlayer}
                light={previewUrl}
            />
        </div>
    );
};

export default VideoPlayer;
