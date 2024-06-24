import QuestionsIcon from '@/assets/images/welcomeUser/questions.svg'
import { closeModal } from '@/store/modalsSlice'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import css from './OnboardingQuestions.module.scss'
export const OnboardingQuestions = () => {
    const dispatch = useDispatch();
    const close = () => dispatch(closeModal());
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        modalRef.current?.classList.add(css.open);
    }, []);
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <Link to="/questions" className={css.icon} onClick={close}>
                    <QuestionsIcon />
                </Link>
                <div className={css.questions}>
                    <p>
                        Ответы <br />
                        на вопросы
                    </p>
                </div>
                <button type="button" className={css.button} onClick={close}>
                    Хорошо
                </button>
            </div>
        </div>
    );
};
