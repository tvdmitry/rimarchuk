import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { Menu } from '@/modules/menu/Menu';
import { PodcastsBlock } from '@/modules/podcastsBlock/PodcastsBlock';
import { VideoBlock } from '@/modules/videoBlock/VideoBlock';
import { getAffirmationAll } from '@/store/affirmationSlice';
import { authToken } from '@/store/authSlice';
import { getUser } from '@/store/currentUserSlice';
import { openModal, setOpen } from '@/store/modalsSlice';
import { addNewUser, getUsersAll } from '@/store/userSlice';
import { getVideosAll } from '@/store/videosSlice';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { AllUsers, AuthResponse, AuthUser, UserResponse } from '@/utils/types';
import { ModalsResponse } from '@/utils/types/modals';

import css from './Main.module.scss';
import { AffirmationDay } from './components/AffirmationDay';
import { BookBlock } from './components/BookBlock';
import { WaterTracker } from './components/WaterTracker';

const MainPage = () => {
    const { initDataUnsafe } = useTelegram();
    const [, setIsMobile] = useState(window.innerWidth < 500);
    const [show, setShow] = useState(false);
    const [, setIsScrollable] = useState(false);

    const [, setIsIdExists] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId: number = initDataUnsafe?.user?.id;
    const userName: string = initDataUnsafe?.user?.first_name;

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const allUsers: AllUsers = useSelector((state: UserResponse) => state.user);

    useEffect(() => {
        const fetchData = async () => {
            if (!allUsers.data.length) {
                await dispatch(getUsersAll());
            }
            if (userId && userName) {
                const isIdExists = allUsers.data.some((user) => +user.user_id === +userId);
                setIsIdExists(isIdExists);
                if (!isIdExists) {
                    setShow(true);
                    dispatch(setOpen(show));
                    dispatch(addNewUser({ user_id: userId, user_name: userName }));
                }
                const token = localStorage.getItem('api_token');
                const authResponse = await dispatch(authToken(Number(userId)));
                if (!token) {
                    const authResponse = await dispatch(authToken(Number(userId)));
                    if (authToken.fulfilled.match(authResponse)) {
                        await dispatch(getAffirmationAll());
                        await dispatch(getVideosAll());
                    }
                } else {
                    console.error('Error authenticating user:', authResponse.payload);
                }
            }
        };

        fetchData();
    }, [dispatch, allUsers.data, userId, userName]);

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser.user[0]) {
                localStorage.setItem('api_token', authUser.user[0].api_token);
                await dispatch(getUser());
            }
        };

        if (authUser.user.length > 0 && !localStorage.getItem('api_token')) {
            fetchUser();
        }
    }, [authUser.user, dispatch]);

    const isShow = useSelector((state: ModalsResponse) => state.modals.firstShow);

    useEffect(() => {
        const isAlreadyShowModals = localStorage.getItem('SHOWALLMODALS');
        if (!isShow && isAlreadyShowModals !== 'true') {
            setIsScrollable(true);
            dispatch(openModal('ONBOARDINGTASKS'));
            localStorage.setItem('SHOWALLMODALS', 'true');
        }
    }, [isShow, dispatch]);

    const user = useSelector((state: UserResponse) => state.user.data);
    const autherUser = user.find((user) => user.user_id === userId);
    return (
        <div className={css.container}>
            <div>
                <AffirmationDay />
                <WaterTracker />
                <PodcastsBlock />
                <BookBlock />
                <VideoBlock />
                <Menu />
            </div>
        </div>
    );
};

export default MainPage;
