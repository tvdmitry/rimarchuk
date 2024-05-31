import { FC } from 'react';
import { Link } from 'react-router-dom';

import cs from 'classnames';

import VideoPlay from '@/assets/images/videoCard/playVideo.svg';
import { Videos } from '@/utils/types/videos';
import videoPictureSrc from '@/assets/images/videoCard/videoTwo.jpg'

import css from './VideoCard.module.scss';

export type VideoCardProps = Videos & {
    className?: any;
    isPage?: boolean;
    index?: number;
};

export const VideoCard: FC<VideoCardProps> = (props) => {
    const { id, className, name, pic_url, vid_url, isPage, index } = props;

    return (
      <Link to={`/video/${id}`} className={css.videoPlay}>
        <div className={cs(css.videoCardWrapper, className)}>
            <div className={cs(css.videoCard, isPage ? css.videoPageCard : '')}>
                <img src={videoPictureSrc} />
            </div>
            <div className={css.cardTitle}>{name}</div>

            <div className={css.videoIcon}>
                <VideoPlay />
                <p className={css.startVideo}>Смотреть</p>
            </div>
        </div>
      </Link>
    );
};
