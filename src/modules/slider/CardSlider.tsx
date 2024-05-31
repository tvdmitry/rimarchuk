import React, { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';
import css from './CardSlider.module.scss';

export type CardSliderProps = {
    children: ReactNode;
    slidesToShow?: number;
    slidesToShowMobile?: number;
};

const CardSlider: FC<CardSliderProps> = (props) => {
    const { children, slidesToShowMobile } = props;

    return (
      <Swiper
        slidesPerView={slidesToShowMobile}
        className={css.CardSlider}
        spaceBetween={12}
        freeMode={true}
      >
          {children}
      </Swiper>
    )
};

export default CardSlider;
