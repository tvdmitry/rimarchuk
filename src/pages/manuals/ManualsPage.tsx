import React, { FC, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { Menu } from '@/modules/menu/Menu';
import { getManualsAll } from '@/store/manualsSlice';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { AllManuals, AllManualsResponse } from '@/utils/types/manuals';

import css from './ManualsPage.module.scss';
import { ManualCard } from './components/parts/ManualCard';

export type ManualsPageProps = {
    isPage?: boolean;
};

const ManualsPage: FC<ManualsPageProps> = () => {
    useBackButton('/');

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const allManuals: AllManuals = useSelector((state: AllManualsResponse) => state.manuals, shallowEqual);

    useEffect(() => {
        dispatch(getManualsAll());
    }, [dispatch]);

    return (
        <div className={css.manualsPage}>
            <HeaderPage title="Методички" />
            <div className={css.manualsWrapper}>
                {allManuals.data?.map((item) => (
                    <ManualCard key={item.id} {...item} />
                ))}
            </div>
            <Menu />
        </div>
    );
};

export default ManualsPage;
