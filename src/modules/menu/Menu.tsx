import { Link } from 'react-router-dom'

import cs from 'classnames'

import CourseIcon from '@/assets/images/main/course.svg'
import HomeIcon from '@/assets/images/main/home.svg'
import ManualIcon from '@/assets/images/main/manual.svg'

import { openOnboardingCourse, openOnboardingHome, openOnboardingManual } from '@/store/modalsSlice'
import { ModalsResponse } from '@/utils/types/modals'
import { useDispatch, useSelector } from 'react-redux'
import css from './Menu.module.scss'

export const Menu = () => {
    const isShow: boolean = useSelector((state: ModalsResponse) => state.modals.firstShow);
    const dispatch = useDispatch();
    const isActive = (path: string) => {
        return window.location.pathname === path;
    };

    const handleOnManualClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const isAlreadyShow = localStorage.getItem('onboardingManualAlreadyShow');
        if (isShow && isAlreadyShow !== 'true') {
            event.preventDefault();
            dispatch(openOnboardingManual());
            localStorage.setItem('onboardingManualAlreadyShow', 'true');
        }
    };

    const handleOnHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const isAlreadyShow = localStorage.getItem('onboardingHomeAlreadyShow');
        if (isShow && isAlreadyShow !== 'true') {
            event.preventDefault();
            dispatch(openOnboardingHome());
            localStorage.setItem('onboardingHomeAlreadyShow', 'true');
        }
    };

    const handleOnCourseClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const isAlreadyShow = localStorage.getItem('onboardingCourseAlreadyShow');
        if (isShow && isAlreadyShow !== 'true') {
            event.preventDefault();
            dispatch(openOnboardingCourse());
            localStorage.setItem('onboardingCourseAlreadyShow', 'true');
        }
    };

    return (
        <div className={css.mainMenu}>
            <Link
                to="/manuals"
                onClick={handleOnManualClick}
                className={cs(css.mainLink, isActive('/manuals') && css.activeLink)}
            >
                <div className={css.mainIcon}>
                    <ManualIcon />
                </div>
            </Link>
            <Link to="/" className={cs(css.mainLink, isActive('/') && css.activeLink)} onClick={handleOnHomeClick}>
                <div className={css.mainIcon}>
                    <HomeIcon />
                </div>
            </Link>
            <Link
                to="/courses"
                className={cs(css.mainLink, isActive('/courses') && css.activeLink)}
                onClick={handleOnCourseClick}
            >
                <div className={css.mainIcon}>
                    <CourseIcon />
                </div>
            </Link>
        </div>
    );
};
