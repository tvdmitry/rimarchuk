import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { PodcastCard } from '@/pages/main/components/parts/PodcastCard';
import { IMedia } from '@/utils/types/media';

import { CommonHeader } from '../header/components/CommonHeader';
import css from './PodcastsBlock.module.scss';

export type PodcastsBlockProps = any;

export const data: IMedia[] = [
    {
        id: 1,
        name: 'Как я создала программу',
        time: '13:55',
        url: 'https://content-water.plutus-fin.ru/music/КАК Я СОЗДАЛА ПРОГРАММУ.ogg',
        image: '',
    },
    {
        id: 2,
        name: 'О той самой жизни в настоящем',
        url: 'https://content-water.plutus-fin.ru/music/О той самой жихни в настоящем.ogg',
        time: '11:21',
        image: '',
    },
    {
        id: 3,
        name: 'Поговорим о твоей мотивации',
        url: 'https://content-water.plutus-fin.ru/music/Поговорим о твоей мотивации.ogg',
        time: '9:30',
        image: '',
    },
    {
        id: 4,
        name: 'Создаем свои новые убеждения',
        url: 'https://content-water.plutus-fin.ru/music/Создаем свои новые убеждения.ogg',
        time: '07:11',
        image: '',
    },
];

export const PodcastsBlock: FC<PodcastsBlockProps> = () => {
    return (
        <div className={css.podcastsBlock}>
            <Link to="/podcasts" className={css.resetStyle}>
                <CommonHeader title="Подкасты" />
            </Link>

            <Swiper spaceBetween={12} slidesPerView={1.75} className={css.slider} freeMode={true}>
                {data?.map((item, index) => (
                    <SwiperSlide key={item.id}>
                        <PodcastCard {...item} index={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
