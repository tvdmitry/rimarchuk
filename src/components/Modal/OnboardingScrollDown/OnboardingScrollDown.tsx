import ArrowDown from '@/assets/images/arrowIcon/Arrow 1.svg'
import { closeModal } from '@/store/modalsSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import css from './OnboardingScrollDown.module.scss'
export const OnboardingScrollDown = () => {
    const dispatch = useDispatch();
    const close = () => dispatch(closeModal());
    const modalRef = useRef(null);
    useEffect(() => {
        modalRef.current?.classList.add(css.open);
    }, []);
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <ArrowDown />
                <p className={css.title}>Листай вниз</p>
                <button type="button" className={css.button} onClick={close}>
                    Хорошо
                </button>
            </div>
        </div>
    );
};
