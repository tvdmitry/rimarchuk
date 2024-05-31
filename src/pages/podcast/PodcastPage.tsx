import React from 'react';

import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { data } from '@/modules/podcastsBlock/PodcastsBlock';
import { useBackButton } from '@/utils/hooks/useBackButton';

import { PodcastCard } from '../main/components/parts/PodcastCard';
import css from './PodcastPage.module.scss';

const PodcastPage = () => {
    useBackButton('/');

    return (
        <div className={css.podcastPage}>
            <HeaderPage title="Подкасты" />
            <div className={css.podcastWrapper}>
                {data?.map((item, index) => (
                    <PodcastCard key={item.id} {...item} index={index} isPage={true} />
                ))}
            </div>
        </div>
    );
};

export default PodcastPage;
