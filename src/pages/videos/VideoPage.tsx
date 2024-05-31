import { useSelector } from 'react-redux';

import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { AllVideos, AllVideosResponse } from '@/utils/types/videos';

import { VideoCard } from '../main/components/parts/VideoCard';
import css from './VideoPage.module.scss';

const VideoPage = () => {
    useBackButton('/');
    const allVideos: AllVideos = useSelector((state: AllVideosResponse) => state.videos);

    return (
        <div className={css.videoPage}>
            <HeaderPage title="Видео от Марины Римарчук" lessSize={true} />
            <div className={css.videoWrapper}>
                { allVideos.data?.map((item, index) => (
                      <VideoCard key={item.id} {...item} index={index} isPage={true} />
                  )) }
            </div>
        </div>
    );
};

export default VideoPage;
