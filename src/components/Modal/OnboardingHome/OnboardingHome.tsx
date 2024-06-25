import HomeIcon from '@/assets/images/main/home.svg'
import { closeModal } from '@/store/modalsSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import css from './OnboardingHome.module.scss'
export const OnboardingHome = () => {
    const modalRef = useRef(null);
    useEffect(() => {
        modalRef.current?.classList.add(css.open);
    }, []);
    const dispatch = useDispatch();
    const close = () => dispatch(closeModal());
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <p>Главное меню</p>
                <button type="button" onClick={close}>
                    Хорошо
                </button>
                <div className={css.mainIcon}>
                    <Link to="/" onClick={close}>
                        <HomeIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};
