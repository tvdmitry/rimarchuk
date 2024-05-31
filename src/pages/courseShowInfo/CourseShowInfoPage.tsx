import { CourseShowInfo } from '@/pages/courses/component/parts/CourseShowInfo';
import { useBackButton } from '@/utils/hooks/useBackButton';

const CourseShowInfoPage = () => {
    useBackButton('/courses');

    return <CourseShowInfo />;
};

export default CourseShowInfoPage;
