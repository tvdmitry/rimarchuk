import { MediaPodcast } from '@/pages/main/components/parts/MediaPodcast';
import { useBackButton } from '@/utils/hooks/useBackButton';

const MediaPodcastPage = () => {
    useBackButton('/');
    return <MediaPodcast />;
};

export default MediaPodcastPage;
