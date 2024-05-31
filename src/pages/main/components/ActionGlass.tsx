import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ThunkDispatch } from '@reduxjs/toolkit';

import GlassIcon from '@/assets/images/actionGlass/glass.svg';
import { CircleProgressBar } from '@/modules/progressBar/CircleProgressBar';
import { GetWaterResponse, WaterData } from '@/utils/types/water';

import css from './ActionGlass.module.scss';

export const ActionGlass = () => {
    const waterVolume: WaterData = useSelector((state: GetWaterResponse) => state.waterGet);
    const percent = Math.round((waterVolume.data.data / 2560) * 100);

    return (
        <div className={css.actionGlass}>
            <CircleProgressBar circleWidth={83} percent={percent} />

            <Link to="/waterTracker" className={css.addGlass}>
                <div className={css.glassIcon}>
                    <GlassIcon />
                </div>
                <div className={css.glassAdd}>
                    <p>Добавить стакан&nbsp;+</p>
                </div>
            </Link>
        </div>
    );
};
