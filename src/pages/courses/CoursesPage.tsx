import React, { FC } from 'react';

import avatarLesson from '@/assets/images/course/avatar.png';
import brainImage from '@/assets/images/courses/brain.png';
import meditationImage from '@/assets/images/courses/meditation.png';
import moneyImage from '@/assets/images/courses/money.png';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { Menu } from '@/modules/menu/Menu';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { ICourses } from '@/utils/types/courses';

import css from './CoursesPage.module.scss';
import { CoursesCard } from './component/parts/CoursesCard';

export type CoursesPageProps = {
    isPage?: boolean;
};

export const dataCourses: ICourses[] = [
    {
        id: '1',
        title: 'Бесплатные курсы',
        card: [
            {
                title: 'Тело - храм. Как правильно эксплуатировать свое тело:',
                description: 'Уроков: 6',
                price: 7777,
                buttonText: 'Стоимость курса',
                image: meditationImage,
                buttonBuy: 'Купить курс',
                id: '5',
                lesson: [
                    {
                        id: '11',
                        image: '',
                        title: 'О важности воды, которую недооценивают',
                        description: 'Урок 1',
                        open: true,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%9E%20%D0%B2%D0%B0%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D0%B8%20%D0%B2%D0%BE%D0%B4%D0%B8%D1%87%D0%BA%D0%B8%20%F0%9F%92%A6%F0%9F%92%A6%F0%9F%92%A6.mp4',
                    },
                    {
                        id: '12',
                        image: '',
                        title: 'Про очищение организма, кому это надо',
                        description: 'Урок 2',
                        open: true,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%9F%D1%80%D0%BE%20%D0%BE%D1%87%D0%B8%D1%89%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BE%D1%80%D0%B3%D0%B0%D0%BD%D0%B8%D0%B7%D0%BC%D0%B0%F0%9F%8C%BF%F0%9F%8C%BF%F0%9F%8C%BF.mp4',
                    },
                    {
                        id: '13',
                        image: '',
                        title: 'Про углеводы. То, что вы должны знать прямо сейчас',
                        description: 'Урок 3',
                        open: true,
                        url: 'https://content-water.plutus-fin.ru//videos/%D0%9F%D1%80%D0%BE%20%D1%83%D0%B3%D0%BB%D0%B5%D0%B2%D0%BE%D0%B4%D1%8B%20%F0%9F%8D%8E%F0%9F%91%80.mp4',
                    },
                    {
                        id: '14',
                        image: '',
                        title: 'Жиры и молодость. Прямая связь',
                        description: 'Урок 4',
                        open: true,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%9F%D0%A0%D0%9E%20%D0%92%D0%90%D0%96%D0%9D%D0%9E%D0%A1%D0%A2%D0%AC%20%D0%96%D0%98%D0%A0%D0%9E%D0%92%20%D0%92%20%D0%A0%D0%90%D0%A6%D0%98%D0%9E%D0%9D%D0%95.mp4',
                    },
                    {
                        id: '15',
                        image: '',
                        title: 'Без белка и жизнь не та. Всё, что нужно знать о белках в рационе',
                        description: 'Урок 5',
                        open: true,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%9F%D0%A0%D0%9E%20%D0%92%D0%90%D0%96%D0%9D%D0%9E%D0%A1%D0%A2%D0%AC%20%D0%91%D0%95%D0%9B%D0%9A%D0%90%20%D0%92%20%D0%A0%D0%90%D0%A6%D0%98%D0%9E%D0%9D%D0%95.mp4',
                    },
                    {
                        id: '16',
                        image: '',
                        title: 'Женское оздоровление и питание',
                        description: 'Урок 6',
                        open: true,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%96%D0%B5%D0%BD%D1%81%D0%BA%D0%BE%D0%B5%20%D0%BE%D0%B7%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5.%20%D0%9F%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D0%B5.%20%D0%96%D0%B8%D1%80%D1%8B%20%D0%B8%20%D0%B1%D0%B5%D0%BB%D0%BA%D0%B8.mp4',
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'Авторские курсы',
        card: [
            {
                title: 'Мышление изобильного человека.\n' + 'Или как выйти из матрицы и достигать любых целей:',
                description: 'Уроков: 5',
                price: 7777,
                buttonText: 'Стоимость курса',
                buttonBuy: 'Купить курс',
                image: brainImage,
                id: '6',
                lesson: [
                    {
                        id: '17',
                        image: avatarLesson,
                        title: 'Опыт-секрет успеха',
                        description: 'Урок 1',
                        open: false,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%9E%D0%9F%D0%AB%D0%A2%20-%20%D0%A1%D0%95%D0%9A%D0%A0%D0%95%D0%A2%20%D0%A3%D0%A1%D0%9F%D0%95%D0%A5%D0%90.mp4',
                    },
                    {
                        id: '18',
                        image: avatarLesson,
                        title: 'Выход из матрицы',
                        description: 'Урок 2',
                        open: false,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%92%D0%AB%D0%A5%D0%9E%D0%94%20%D0%98%D0%97%20%D0%9C%D0%90%D0%A2%D0%A0%D0%98%D0%A6%D0%AB.mp4',
                    },
                    {
                        id: '19',
                        image: avatarLesson,
                        title: 'Самопрограммирование',
                        description: 'Урок 3',
                        open: false,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%A1%D0%B0%D0%BC%D0%BE%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5.mp4',
                    },
                    {
                        id: '20',
                        image: avatarLesson,
                        title: 'Манипуляции',
                        description: 'Урок 4',
                        open: false,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%9C%D0%B0%D0%BD%D0%B8%D0%BF%D1%83%D0%BB%D1%8F%D1%86%D0%B8%D0%B8.mp4',
                    },
                    {
                        id: '21',
                        image: avatarLesson,
                        title: 'Интуиция',
                        description: 'Урок 5',
                        open: false,
                        url: 'https://content-water.plutus-fin.ru/videos/%D0%98%D0%BD%D1%82%D1%83%D0%B8%D1%86%D0%B8%D1%8F.mp4',
                    },
                ],
            },
            {
                title: 'Как раскрыть потенциал и запустить денежный поток. Денежное мышление и маркетинг:',
                description: 'Уроков: 4',
                price: 7777,
                buttonText: 'Стоимость курса',
                image: moneyImage,
                buttonBuy: 'Купить курс',
                contentInfo: (
                    <div>
                        <p className={css.courseTextPage}>Денежное мышление и маркетинг.</p>
                        Здесь я поделюсь опытом кратного роста дохода. Расскажу, как лично тебе сделать результат в
                        кратчайший промежуток времени.Как не зависеть ни от кого и растить себя, свою личность
                        успешно!👇
                    </div>
                ),
                id: '7',
                lesson: [
                    {
                        id: '22',
                        image: avatarLesson,
                        title: 'Как найти себя. Лучшая практика',
                        description: 'Урок 1',
                        open: false,
                    },
                    {
                        id: '23',
                        image: avatarLesson,
                        title: 'Как продавать дорого',
                        description: 'Урок 2',
                        open: false,
                    },
                    {
                        id: '24',
                        image: avatarLesson,
                        title: 'Денежный маркетинг',
                        description: 'Урок 3',
                        open: false,
                    },
                    {
                        id: '25',
                        image: avatarLesson,
                        title: 'Практика на деньги',
                        description: 'Урок 4',
                        open: false,
                    },
                ],
            },
        ],
    },
];

const CoursesPage: FC<CoursesPageProps> = () => {
    useBackButton('/');

    return (
        <div className={css.coursesPage}>
            <HeaderPage title="Курсы" />
            <div className={css.coursesWrapper}>
                {dataCourses?.map((item) => (
                    <CoursesCard key={item.id} course={item} />
                ))}
            </div>
            <Menu />
        </div>
    );
};

export default CoursesPage;
