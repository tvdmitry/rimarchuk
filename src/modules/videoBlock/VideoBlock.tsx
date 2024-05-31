import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { VideoCard } from '@/pages/main/components/parts/VideoCard';
import { AllVideos, AllVideosResponse } from '@/utils/types/videos';

import { CommonHeader } from '../header/components/CommonHeader';
import css from './VideoBlock.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export type VideoBlockProps = any;

export const VideoBlock: FC<VideoBlockProps> = () => {
    const allVideos: AllVideos = useSelector((state: AllVideosResponse) => state.videos);

    return (
        <div className={css.videoBlock}>
            <Link to="/videos" className={css.resetStyle}>
                <CommonHeader title="Видео от Марины Римарчук" />
            </Link>

          <Swiper
            spaceBetween={12}
            slidesPerView={1.75}
            freeMode={true}
          >
            {allVideos.data?.map((item, index) => (
              <SwiperSlide key={item.id}>
                <VideoCard {...item} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
    );
};
