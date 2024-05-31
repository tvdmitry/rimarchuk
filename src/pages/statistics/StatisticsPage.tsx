import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AvatarIcon from '@/assets/images/statistics/avatar.svg';
import { Loader } from '@/components/Loader';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { useTelegram } from '@/utils/hooks/useTelegram';
import { AuthResponse, AuthUser } from '@/utils/types';

import css from './StatisticsPage.module.scss';
import { MyStatistics } from './components/MyStatistics';

const StatisticsPage = () => {
    useBackButton('/');
    const { initDataUnsafe } = useTelegram();
    const [userImg, setUserImg] = useState('');

    const authUser: AuthUser = useSelector((state: AuthResponse) => state.auth);

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

    return (
        <div className={css.statisticsWrapper}>
            <div className={css.statisticsPage}>
                <div className={css.userAvatar}>
                    {userImg === '' ? (
                        <div className={css.loader}></div>
                    ) : (
                        <img
                            src={userImg ? `data:image/png;base64,${userImg}` : ''}
                            className={css.userAvatar}
                            alt="avatar"
                        />
                    )}
                </div>
                <p className={css.username}>{initDataUnsafe?.user?.first_name ?? 'Аноним'}</p>
            </div>
            <MyStatistics />
        </div>
    );
};

export default StatisticsPage;
