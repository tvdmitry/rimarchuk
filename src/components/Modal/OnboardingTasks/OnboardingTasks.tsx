import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ArrowIcon from '@/assets/images/arrowIcon/arrow.svg'
import { closeModal } from '@/store/modalsSlice'
import { useTelegram } from '@/utils/hooks/useTelegram'
import { AuthResponse, AuthUser } from '@/utils/types'
import css from './OnboardingTasks.module.scss'

export const OnboardingTasks = () => {
    const { initDataUnsafe } = useTelegram();
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const dispatch = useDispatch();
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        modalRef.current?.classList.add(css.open);
    }, []);
    const close = () => dispatch(closeModal());
    const userName = initDataUnsafe?.user?.first_name;
    const userImg = initDataUnsafe?.user?.photo_url
    return (
        <div className={css.ModalWindow} ref={modalRef}>
            <div className={css.wrapper}>
                <div className={css.user__container}>
                    <Link to="/statistics" onClick={close}>
                        <div className={css.user}>
                            <div className={css.greetings}>
                                {userImg === '' ? (
                                    <div className={css.loader}></div>
                                ) : (
                                    <img
                                        src={userImg ? `data:image/png;base64,${userImg}` : ''}
                                        className={css.userAvatar}
                                        alt="avatar"
                                    />
                                )}
                                <div className={css.userInfo}>
                                    <div className={css.helloUser}>Привет</div>
                                    <div className={css.username}>{userName ?? 'Аноним'}</div>
                                </div>
                            </div>
                            <button type="button" className={css.arrowIcon}>
                                <ArrowIcon />
                            </button>
                        </div>
                    </Link>
                </div>
                <div className={css.title}>
                    <p>Выполняй задания и получай индивидуальные подарки</p>
                </div>
                <div className={css.tasksButton}>
                    <button type="button" onClick={close}>
                        Чудесно
                    </button>
                </div>
            </div>
        </div>
    );
};
