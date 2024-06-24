import ArrowIcon from '@/assets/images/arrowIcon/arrow.svg'
import QuestionsIcon from '@/assets/images/welcomeUser/questions.svg'
import { useTelegram } from '@/utils/hooks/useTelegram'
import { AuthResponse, AuthUser } from '@/utils/types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { openOnboardingQuestions, openOnboardingTasks } from '@/store/modalsSlice'
import { ModalsResponse } from '@/utils/types/modals'
import { ThunkDispatch } from '@reduxjs/toolkit'
import css from './WelcomeUser.module.scss'

export const WelcomeUser = () => {
    const { initDataUnsafe } = useTelegram();
    const [userImg, setUserImg] = useState('');
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const firstOpen: boolean = useSelector((state: ModalsResponse) => state.modals.firstShow)
    const userName = initDataUnsafe?.user?.first_name;
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser.user[0]) {
                setUserImg(authUser?.user?.[0].user_img);
            }
        };

        if (authUser.user.length > 0) {
            fetchUser();
        }
    }, [authUser.user]);

    const handleOnLinkClick = () => {
        if (firstOpen) {
            dispatch(openOnboardingTasks());
        } else {
            navigate('/statistics');
        }
    }

    const handleOnButtonClick = () => {
        if (firstOpen) {
            dispatch(openOnboardingQuestions());
        } else {
            navigate('/questions');
        }
    }

    return (
        <div className={css.welcomeUser}>
            <div onClick={handleOnLinkClick}>
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
            </div>
            <button type="button" className={css.questions} onClick={handleOnButtonClick}>
                <QuestionsIcon />
            </button>
        </div>
    );
};
