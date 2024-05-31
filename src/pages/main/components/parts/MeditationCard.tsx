import { FC } from 'react';
import { Link } from 'react-router-dom';

import cs from 'classnames';

import PlayIcon from '@/assets/images/meditationCard/play.svg';
import { Meditations } from '@/utils/types/meditation';

import css from './MeditationCard.module.scss';

export type MeditationCardProps = Meditations & {
    index?: number;
    className?: any;
    isPage?: boolean;
};

export const MeditationCard: FC<MeditationCardProps> = (props) => {
    const { className, name, isPage, time, index, id } = props;

    return (
        <div className={cs(css.meditationCardWrapper, className)}>
            <div className={cs(css.card, isPage ? css.meditationPageCard : '')} data-index={index}>
                <div className={css.cardTitle}>{name}</div>
                <div className={css.cardTime}>{time}</div>
                <Link to={`/mediaMeditation/${id}`}>
                    <PlayIcon className={css.playIcon} />
                </Link>
            </div>
        </div>
    );
};
