import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import cs from 'classnames';

import cameraImage from '@/assets/images/statistics/camera.png';
import microImage from '@/assets/images/statistics/micro.png';
import waterImage from '@/assets/images/statistics/water.png';
import { AuthResponse, AuthUser } from '@/utils/types';
import { IStatisticInfoCard } from '@/utils/types/statistic';

import css from './StatisticInfoCard.module.scss';

export type StatisticInfoCardProps = {
    className?: any;
};

export const StatisticInfoCard: FC<StatisticInfoCardProps> = (props) => {
    const { className } = props;
    const [vidQuantity, setVidQuantity] = useState(0);
    const [podcastQuantity, setPodcastQuantity] = useState(0);
    const [waterWeek, setWaterWeek] = useState(0);
    const [waterMonth, setWaterMonth] = useState(0);

    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

    console.log(authUser, '222');

    useEffect(() => {
        if (authUser.user[0]) {
            setVidQuantity(authUser?.user[0]?.vid_quantity);
            setPodcastQuantity(authUser?.user[0]?.podcadst_quantity);
            setWaterWeek(authUser?.user[0]?.water_week);
            setWaterMonth(authUser?.user[0]?.water_month);
        }
    }, [authUser]);

    return (
        <div className={cs(css.statisticInfoCard, className)}>
            <div className={cs(css.infoCardItem)}>
                <img src={waterImage} className={css.infoCardIcon} alt="icon statistic" />
                <div className={css.infoCardTitle}>{waterWeek} мл</div>
                <div className={css.infoCardDescription}>за неделю выпито воды</div>
            </div>

            <div className={cs(css.infoCardItem)}>
                <img src={waterImage} className={css.infoCardIcon} alt="icon statistic" />
                <div className={css.infoCardTitle}>{waterMonth} мл</div>
                <div className={css.infoCardDescription}>за месяц выпито воды</div>
            </div>

            <div className={cs(css.infoCardItem)}>
                <img src={cameraImage} className={css.infoCardIcon} alt="icon statistic" />
                <div className={css.infoCardTitle}>{vidQuantity}</div>
                <div className={css.infoCardDescription}>Видео вы уже посмотрели</div>
            </div>

            <div className={cs(css.infoCardItem)}>
                <img src={microImage} className={css.infoCardIcon} alt="icon statistic" />
                <div className={css.infoCardTitle}>{podcastQuantity}</div>
                <div className={css.infoCardDescription}>Подкастов вы уже послушали</div>
            </div>
        </div>
    );
};
