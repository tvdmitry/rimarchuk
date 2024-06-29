import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ThunkDispatch } from '@reduxjs/toolkit'
import cs from 'classnames'

import CupIcon from '@/assets/images/actionGlass/cup.svg'
import CupBlackIcon from '@/assets/images/actionGlass/cupBlack.svg'
import MinusIcon from '@/assets/images/actionGlass/minus.svg'
import PlusIcon from '@/assets/images/actionGlass/plus.svg'
import { HeaderPage } from '@/modules/header/components/HeaderPage'
import WaterWaveImage from '@/pages/main/components/parts/WaterWaveImage'
import { getUser } from '@/store/currentUserSlice'
import { addVolumeWater, delVolumeWater } from '@/store/waterAddSlice'
import { getWater } from '@/store/waterGetSlice'
import { UserGet, UserGetResponse } from '@/utils/types'
import { GetWaterResponse } from '@/utils/types/water'

import { useTelegram } from '@/utils/hooks/useTelegram'
import { useLocation, useNavigate } from 'react-router'
import css from './WaterTracker.module.scss'
import { WaterVolume } from './WaterVolume'

const MAX_SIZE = 2560;
const CONTAINER_HEIGHT_PX = 300;

export const WaterTracker = () => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { BackButton } = useTelegram();
    const navigate = useNavigate();
    const location = useLocation();
    const waterVolume = useSelector((state: GetWaterResponse) => state.waterGet);
    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);

    const [prevSliderValue, setPrevSliderValue] = useState(() => {
        const savedValue = localStorage.getItem('prevSliderValue');
        return savedValue ? parseInt(savedValue, 10) : 0;
    });

    const [adjustedHeight, setAdjustedHeight] = useState(0);
    const [containerHeight, setContainerHeight] = useState(CONTAINER_HEIGHT_PX);
    const [localSliderValue, setLocalSliderValue] = useState(prevSliderValue);
    const [adjustedWaterHeight, setAdjustedWaterHeight] = useState(0);
    useEffect(() => {
        const fetchGetWater = async () => {
            await dispatch(getWater());
            await dispatch(getUser());
        };

        fetchGetWater();
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            const container = document.getElementById('rangeContainer');
            if (container) {
                setContainerHeight(container.clientHeight);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setAdjustedHeight((localSliderValue / MAX_SIZE) * 210);
        setAdjustedWaterHeight((localSliderValue / MAX_SIZE) * 350);
    }, [localSliderValue, containerHeight]);

    useEffect(() => {
        localStorage.setItem('prevSliderValue', prevSliderValue.toString());
    }, [prevSliderValue]);

    const handleIncrease = () => {
        setLocalSliderValue(Math.min(localSliderValue + 320, MAX_SIZE));
    };

    const handleDecrease = () => {
        setLocalSliderValue(Math.max(localSliderValue - 320, 0));
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSliderValue(+e.target.value);
    };

    const handleAddGlassClick = async () => {
        const diff = localSliderValue - prevSliderValue;

        if (diff === 0) return;

        const idUser = currentUser.data.user_id;

        if (diff > 0) {
            await dispatch(addVolumeWater({ user_id: idUser, water_ml: diff }));
        } else if (diff < 0) {
            await dispatch(delVolumeWater({ user_id: idUser, water_ml: -diff }));
        }

        setPrevSliderValue(localSliderValue);
        await dispatch(getWater());
        await dispatch(getUser());
    };
    BackButton.show();
    BackButton.onClick(() => {
        navigate(location.state?.from ?? '/');
    })
    return (
        <div className={css.waterTrackerWrapper}>
            <div className={css.waterTracker}>
                <HeaderPage title="Вода" className={css.waterHeader} />
                <WaterVolume sliderValue={localSliderValue} />
            </div>
            <div className={css.range}>
                <div className={css.cupIcon}>
                    <CupIcon />
                </div>
                <div className={css.field}>
                    <button type="button" onClick={handleDecrease} className={cs(css.controlsWater, css.minusIcon)}>
                        <MinusIcon />
                    </button>
                    <div className={css.rangeWithScale}>
                        <div className={css.scaleValues}>
                            {Array.from({ length: 9 }, (_, index) => (
                                <span key={index * 320} className={css.mark}></span>
                            ))}
                        </div>
                        <div className={css.rangeContainer}>
                            <input
                                type="range"
                                id="range"
                                min="0"
                                max={MAX_SIZE}
                                value={localSliderValue}
                                onChange={handleSliderChange}
                                className={css.rangeInput}
                            />
                            <label
                                htmlFor="range"
                                className={css.waterLevelLabel}
                                style={{ left: `${adjustedHeight}px` }}
                            >
                                {localSliderValue}
                            </label>
                        </div>
                    </div>
                    <button onClick={handleIncrease} type="button" className={cs(css.controlsWater, css.plusIcon)}>
                        <div className={css.ml}>мл</div>
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <button type="button" onClick={handleAddGlassClick} className={css.addGlass}>
                <div className={css.addGlassIcon}>
                    <CupBlackIcon />
                </div>
                <p className={css.addGlassText}>Добавить стакан&nbsp;+</p>
            </button>
            <WaterWaveImage waterLevel={adjustedWaterHeight} />
        </div>
    );
};