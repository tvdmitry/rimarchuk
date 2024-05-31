import React from 'react';

import { useBackButton } from '@/utils/hooks/useBackButton';

import css from './MyStatistics.module.scss';
import { StatisticLevel } from './parts/StatisticLevel';

export const MyStatistics = () => {
    useBackButton('/');

    return (
        <div className={css.myStatistics}>
            <div className={css.myStatisticsTitle}>Моя статистика</div>
            <StatisticLevel />
        </div>
    );
};
