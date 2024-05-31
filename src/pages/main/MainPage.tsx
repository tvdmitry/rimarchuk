import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';

import { Menu } from '@/modules/menu/Menu';
import { PodcastsBlock } from '@/modules/podcastsBlock/PodcastsBlock';
import { VideoBlock } from '@/modules/videoBlock/VideoBlock';
import { getAffirmationAll } from '@/store/affirmationSlice';
import { authToken } from '@/store/authSlice';
import { getUser } from '@/store/currentUserSlice';
import { addNewUser, getUsersAll } from '@/store/userSlice';
import { getVideosAll } from '@/store/videosSlice';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { AllUsers, AuthResponse, AuthUser, UserResponse } from '@/utils/types';

import css from './Main.module.scss';
import { AffirmationDay } from './components/AffirmationDay';
import { BookBlock } from './components/BookBlock';
import { WaterTracker } from './components/WaterTracker';

const MainPage = () => {
    const { initDataUnsafe } = useTelegram();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 500);
    /* const [userTokenFetched, setUserTokenFetched] = useState(false);*/
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const userId: number = initDataUnsafe?.user?.id;
    const userName: string = initDataUnsafe?.user?.first_name;

    // console.log(userId, 'userId');
    // console.log(userName, 'userName');

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 500);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    //console.log(initDataUnsafe?.user, 'initDataUnsafe?.user');

    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);
    const allUsers: AllUsers = useSelector((state: UserResponse) => state.user);

    // console.log(authUser, 'authUser');
    // console.log(allUsers.data.length, 'allUsers.data.length');

    useEffect(() => {
        const fetchData = async () => {
            if (!allUsers.data.length) {
                await dispatch(getUsersAll());
            }

            if (userId && userName) {
                const isIdExists = allUsers.data.some((user) => +user.user_id === +userId);
                if (!isIdExists) {
                    await dispatch(addNewUser({ user_id: +userId, user_name: userName }));
                    dispatch(authToken(Number(userId)));
                } else {
                    await dispatch(authToken(Number(userId)));
                    await dispatch(getAffirmationAll());
                    await dispatch(getVideosAll());
                }
            }
        };

        fetchData();
    }, [dispatch, allUsers.data, userId, userName]);

    // useEffect(() => {
    //     const fetchAllData = async () => {
    //         await Promise.all([dispatch(authToken(Number(userId)))]);
    //     };
    //     fetchAllData();
    // }, [dispatch, userId]);

    useEffect(() => {
        const fetchUser = async () => {
            if (authUser.user[0]) {
                localStorage.setItem('api_token', authUser.user[0].api_token);
                await dispatch(getUser());
            }
        };

        //fetchUser();

        if (authUser.user.length > 0) {
            fetchUser();
        }
    }, [authUser.user, dispatch]);

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
