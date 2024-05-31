import { CourseInfo } from '@/pages/courses/component/parts/CourseInfo';
import { useBackButton } from '@/utils/hooks/useBackButton';

import css from './CourseInfoPage.module.scss';

const CourseInfoPage = () => {
    return (
        <div className={css.courseInfoPage}>
            <CourseInfo />
        </div>
    );
};

export default CourseInfoPage;
