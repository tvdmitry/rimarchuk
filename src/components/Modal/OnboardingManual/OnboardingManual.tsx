import ManualIcon from '@/assets/images/main/manual.svg'
import { closeModal } from '@/store/modalsSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import css from './OnboardingManual.module.scss'

export const OnboardingManual = () => {
    const modalRef = useRef(null);
    useEffect(() => {
        modalRef.current?.classList.add(css.open);
    }, []);
    const dispatch = useDispatch();
    const close = () => dispatch(closeModal());
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <p>Здесь можно скачать бесплатные методички</p>
                <button type="button" onClick={close}>
                    Чудесно
                </button>
                <div className={css.mainIcon}>
                    <Link to="/manuals" onClick={close}>
                        <ManualIcon />
                    </Link>
                </div>
            </div>
        </div>
    );
};
