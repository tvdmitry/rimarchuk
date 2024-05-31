import { MediaMeditation } from '@/pages/main/components/parts/MediaMeditation';
import { useBackButton } from '@/utils/hooks/useBackButton';

const MediaMeditationPage = () => {
    useBackButton('/');
    return <MediaMeditation />;
};

export default MediaMeditationPage;
