import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { MeditationCard } from '@/pages/main/components/parts/MeditationCard';
import { AllMeditations, AllMeditationsResponse } from '@/utils/types/meditation';

import { CommonHeader } from '../header/components/CommonHeader';
import CardSlider from '../slider/CardSlider';
import css from './MeditationsBlock.module.scss';
import {SwiperSlide} from "swiper/react";

export type MeditationsBlockProps = any;

export const MeditationsBlock: FC<MeditationsBlockProps> = () => {
    const allMeditations: AllMeditations = useSelector((state: AllMeditationsResponse) => state.meditations);

    return (
        <div className={css.meditationsBlock}>
            <Link to="/meditation" className={css.resetStyle}>
                <CommonHeader title="Медитации" />
            </Link>
            <CardSlider slidesToShowMobile={1.75}>
                {allMeditations.data?.map((item, index) => (
                      <SwiperSlide key={item.id} >
                        <MeditationCard {...item} index={index} />
                      </SwiperSlide>
                  ))
                }
            </CardSlider>
        </div>
    );
};
