import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from '@/components/Loader';

import css from './AppLayout.module.scss';

export const AppLayout = () => {
    // const [videoPlayed, setVideoPlayed] = useState(false);

    // const handleVideoEnded = () => {
    //     setVideoPlayed(true);
    // };

    /*  const dispatch = useDispatch();
    const userStatus = useSelector((store) => store.user.user.status);
    const userData = useSelector((store) => store.user.user.data, shallowEqual);

    const isAuth = userStatus === LoadingStatus.fulfilled && userData?.id;

   */

    return (
        <div className={css.layout}>
            {/*{!videoPlayed && (*/}
            {/*    <ReactPlayer*/}
            {/*        url="https://content-water.plutus-fin.ru/videos/intro.mp4"*/}
            {/*        playing={true}*/}
            {/*        loop={false}*/}
            {/*        muted={true}*/}
            {/*        width="100%"*/}
            {/*        height="100%"*/}
            {/*        style={{ position: 'relative', top: 0, left: 0 }}*/}
            {/*        onEnded={handleVideoEnded}*/}
            {/*    />*/}
            {/*)}*/}

            {/*{videoPlayed && (*/}
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            {/*)}*/}
        </div>
    );
};
