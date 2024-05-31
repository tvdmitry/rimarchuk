import { FC } from 'react';
import { Link } from 'react-router-dom';

import cs from 'classnames';

import PlayIcon from '@/assets/images/meditationCard/play.svg';
import { IMedia } from '@/utils/types/media';

import css from './PodcastCard.module.scss';

export type PodcastCardProps = IMedia & {
    className?: any;
    isPage?: boolean;
    index?: number;
};

export const PodcastCard: FC<PodcastCardProps> = (props) => {
    const { className, name, time, isPage, id, index } = props;

    return (
      <Link to={`/mediaPodcast/${id}`} className={cs(css.podcastCardWrapper, className)}>
        <div className={cs(css.podcastCard, isPage ? css.podcastPageCard : '')} data-index={index}>
            <div className={cs(css.cardTitle)}>{name}</div>
            <div className={css.cardTime}>{time}</div>
            <PlayIcon className={css.playIcon} />
        </div>
      </Link>
    );
};
