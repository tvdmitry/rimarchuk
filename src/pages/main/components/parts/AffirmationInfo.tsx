import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { getRandomAffirmation } from '@/store/affirmationEditSlice';
import { getAffirmationAll } from '@/store/affirmationSlice';
import { getEntryAffirmation } from '@/utils/helpers/affirmation/getEntryAffirmation';
import { UserGet, UserGetResponse } from '@/utils/types';
import { AffirmationResponse, AllAffirmations } from '@/utils/types/affirmation';

import css from './AffirmationInfo.module.scss';

const useInterval = (callback: () => void, delay: number) => {
    useEffect(() => {
        const intervalId = setInterval(callback, delay);
        return () => clearInterval(intervalId);
    }, [callback, delay]);
};

export const AffirmationInfo = () => {
    const [affirmation, setAffirmation] = useState('');

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const allAffirmation: AllAffirmations = useSelector((state: AffirmationResponse) => state.affirmation);
    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

    // useEffect(() => {
    //     dispatch(getAffirmationAll());
    // }, [dispatch]);

    useEffect(() => {
        setAffirmation(getEntryAffirmation(allAffirmation, currentUser.data?.affirmation_id));
    }, [allAffirmation.data, currentUser.data]);

    useInterval(() => {
        dispatch(getRandomAffirmation());
    }, 12 * 60 * 60 * 1000);

    return (
        <div className={css.affirmation}>
            <div className={css.affirmationTitle}>Аффирмация дня</div>
            <div className={css.affirmationDescription}>{affirmation}</div>
        </div>
    );
};
