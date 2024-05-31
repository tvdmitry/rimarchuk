import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import WaterIcon from '@/assets/images/waterTracker/waterIcon.svg';
import { getUser } from '@/store/currentUserSlice';
import { getWater } from '@/store/waterGetSlice';
import { GetWaterResponse, WaterData } from '@/utils/types/water';

import css from './WaterVolume.module.scss';

export type WaterVolumeProps = {
    sliderValue?: number;
};

export const WaterVolume = (props: WaterVolumeProps) => {
    const { sliderValue } = props;

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const waterVolume: WaterData = useSelector((state: GetWaterResponse) => state.waterGet);

    useEffect(() => {
        const fetchGetWater = async () => {
            await dispatch(getWater());
            await dispatch(getUser());
        };

        fetchGetWater();
    }, [sliderValue]);

    return (
        <div className={css.trackerInfo}>
            <div className={css.waterIcon}>
                <WaterIcon />
            </div>
            <div className={css.waterVolume}>
                <div className={css.volume}>{waterVolume.data.data} из 2560 мл</div>
            </div>
        </div>
    );
};
