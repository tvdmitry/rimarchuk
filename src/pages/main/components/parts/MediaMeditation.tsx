import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useMatch } from 'react-router-dom';

import { MediaPlayer } from '@/modules/media/MediaPlayer';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { AllMeditations, AllMeditationsResponse } from '@/utils/types/meditation';

import css from './MediaMeditation.module.scss';

export type MediaMeditationProps = any;

export const MediaMeditation: FC<MediaMeditationProps> = () => {
    useBackButton('/');
    const matchMeditation = useMatch('/mediaMeditation/:id');
    const allMeditations: AllMeditations = useSelector((state: AllMeditationsResponse) => state.meditations);

    const id = Number(matchMeditation?.params.id);
    const entryInfo = allMeditations.data.find((item) => +item.id === +id);

    return <MediaPlayer className={css.mediaMeditation} entryInfo={entryInfo} />;
};
