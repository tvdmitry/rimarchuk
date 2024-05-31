import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import levelThreeImage from '@/assets/images/tasks/crystal.png';
import levelTwoImage from '@/assets/images/tasks/star.png';
import levelOneImage from '@/assets/images/tasks/stars.png';
import { AccordionComponent } from '@/modules/accordion/AccordionComponent';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { ProgressBar } from '@/modules/progressBar/ProgressBar';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { AuthResponse, AuthUser } from '@/utils/types';
import { IAccordionContent } from '@/utils/types/statistic';

import css from './StatisticTasksPage.module.scss';

const StatisticTasksPage = () => {
    useBackButton('/statistics');

    const [lvlManuals, setLvlManuals] = useState(0);
    const [lvlWather, setLvlWather] = useState(0);
    const [grade, setGrade] = useState('');

    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

    useEffect(() => {
        if (authUser.user[0]) {
            setGrade(String(authUser?.user[0]?.lvl_cur));
            setLvlManuals(authUser?.user[0]?.lvl_manuals);
            setLvlWather(authUser?.user[0]?.lvl_wather_day);
        }
    }, [authUser]);

    const levelData: IAccordionContent[] = [
        {
            id: '1',
            title: 'Звездочка',
            icon: levelOneImage,
            content: [
                {
                    title: 'Куплено 0/3 методичек',
                    progress: {
                        component: <ProgressBar percent={`${lvlManuals}/3`} />,
                        id: '6',
                    },
                },
                {
                    title: '0/20 дней подряд заполняется трекер воды',
                    progress: {
                        component: <ProgressBar percent={`${lvlWather}/3`} />,
                        id: '7',
                    },
                },
            ],
        },
        {
            id: '2',
            title: 'Звезда',
            icon: levelTwoImage,
            content: [
                {
                    title: 'Куплено 0/3 методичек',
                    progress: {
                        component: <ProgressBar percent={`${lvlManuals}/3`} />,
                        id: '8',
                    },
                },
                {
                    title: '3/20 дней подряд заполняется трекер воды',
                    progress: {
                        component: <ProgressBar percent={`${lvlWather}/3`} />,
                        id: '9',
                    },
                },
            ],
        },
        {
            id: '3',
            title: 'Легенда',
            icon: levelThreeImage,
            content: [
                {
                    title: 'Куплено 0/3 методичек',
                    progress: {
                        component: <ProgressBar percent={`${lvlManuals}/3`} />,
                        id: '10',
                    },
                },
                {
                    title: '3/20 дней подряд заполняется трекер воды',
                    progress: {
                        component: <ProgressBar percent={`${lvlWather}/3`} />,
                        id: '11',
                    },
                },
            ],
        },
    ];

    const levelCurrent = [levelData?.find((item) => item.id === grade)];

    return (
        <div className={css.statisticTasksPage}>
            <HeaderPage title="Задания" />
            {levelCurrent ? <AccordionComponent data={levelCurrent} isTasksPage={true} /> : null}
        </div>
    );
};

export default StatisticTasksPage;
