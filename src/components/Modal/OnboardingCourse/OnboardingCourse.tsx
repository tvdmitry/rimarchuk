import CourseIcon from '@/assets/images/main/course.svg'
import { closeModal } from '@/store/modalsSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import css from './OnboardingCourse.module.scss'
export const OnboardingCourse = () => {
		const modalRef = useRef(null);
		useEffect(() => {
			modalRef.current?.classList.add(css.open);
		}, [])
		const dispatch = useDispatch();
		const close = () => dispatch(closeModal());
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <p>
                    Для тебя есть <br /> бесплатный курс
                </p>
                <button type="button" className={css.button} onClick={close}>
                    Супер
                </button>
                <div className={css.mainIcon}>
                    <Link to="/courses" onClick={close}>
                        <CourseIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};
