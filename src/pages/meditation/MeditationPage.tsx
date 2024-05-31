import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { getMeditationsAll } from '@/store/meditationsSlice';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { AllMeditations, AllMeditationsResponse } from '@/utils/types/meditation';

import { MeditationCard } from '../main/components/parts/MeditationCard';
import css from './MeditationPage.module.scss';

export type MeditationPageProps = {
    isPage?: boolean;
};

export const MeditationPage: FC<MeditationPageProps> = () => {
    useBackButton('/');

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const allMeditations: AllMeditations = useSelector((state: AllMeditationsResponse) => state.meditations);

    //console.log(allMeditations.data, 'allMeditations');

    useEffect(() => {
        dispatch(getMeditationsAll());
    }, []);

    return (
        <div className={css.meditationPage}>
            <HeaderPage title="Медитации" />
            <div className={css.meditationWrapper}>
                {allMeditations.data.length
                    ? allMeditations.data?.map((item, index) => (
                          <MeditationCard key={item.id} {...item} isPage={true} index={index} />
                      ))
                    : null}
            </div>
        </div>
    );
};

export default MeditationPage;
