import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import imageThreeSrc from '@/assets/images/tasks/crystal.png';
import imageTwoSrc from '@/assets/images/tasks/star.png';
import imageOneSrc from '@/assets/images/tasks/stars.png';
import { ProgressBar } from '@/modules/progressBar/ProgressBar';
import { AuthResponse, AuthUser } from '@/utils/types';

import { StatisticInfoCard } from './StatisticInfoCard';
import css from './StatisticLevel.module.scss';

export const StatisticLevel = () => {
    const [grade, setGrade] = useState('');

    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

    useEffect(() => {
        if (authUser.user[0]) {
            setGrade(String(authUser?.user[0]?.lvl_cur));
        }
    }, [authUser]);

    const levelGrade = [
        {
            title: 'Звездочка',
            id: '1',
            icon: imageOneSrc,
        },
        {
            title: 'Звезда',
            id: '2',
            icon: imageTwoSrc,
        },
        {
            title: 'Легенда',
            id: '3',
            icon: imageThreeSrc,
        },
    ];

    const levelCurrent = levelGrade.find((item) => item.id === grade);

    return (
        <>
            <div className={css.statisticLevelWrapper}>
                <div className={css.levelCard}>
                    <div className={css.levelCurrent}>
                        <img src={levelCurrent?.icon} className={css.currentIcon} alt="level icon" />
                        <div className={css.currentInfo}>
                            <div className={css.infoTitle}>{levelCurrent?.title}</div>
                            <div className={css.infoDescription}>Ваш текущий уровень</div>
                        </div>
                    </div>
                    <div className={css.completeLevel}>
                        <div className={css.completeTitle}>До следующего уровня выполнено:</div>
                        <ProgressBar percent={0} />
                    </div>
                    <Link to="/tasks" className={css.watchQuestion}>
                        <div className={css.watchText}>Смотреть задания</div>
                    </Link>
                </div>
            </div>
            <StatisticInfoCard />
        </>
    );
};
