import { closeModal } from '@/store/modalsSlice'
import { ModalsResponse } from '@/utils/types/modals'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import css from './OnboardingAffirmation.module.scss'
export const OnboardingAffirmation = ({ next }: { next: () => void }) => {
    const dispatch = useDispatch();
    const close = () => dispatch(closeModal());
    const affirmation: string = useSelector((state: ModalsResponse) => state.modals.data.affirmation);
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        modalRef.current?.classList.add(css.open);
    }, []);
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <div className={css.affirmation__container}>
                    <p>Аффирмация дня</p>
                    {affirmation}
                </div>
                <div className={css.title}>
                    <p>
                        Заходи ежедневно <br /> и получай пользу дня
                    </p>
                </div>
                <button type="button" className={css.button} onClick={next}>
                    Кайф
                </button>
            </div>
        </div>
    );
};
