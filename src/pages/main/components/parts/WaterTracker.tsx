import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkDispatch } from '@reduxjs/toolkit';
import cs from 'classnames';
import Cookies from 'js-cookie';

import CupIcon from '@/assets/images/actionGlass/cup.svg';
import CupBlackIcon from '@/assets/images/actionGlass/cupBlack.svg';
import MinusIcon from '@/assets/images/actionGlass/minus.svg';
import PlusIcon from '@/assets/images/actionGlass/plus.svg';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import WaterWaveImage from '@/pages/main/components/parts/WaterWaveImage';
import { getCheckPay } from '@/store/checkPaySlice';
import { getUser } from '@/store/currentUserSlice';
import { addVolumeWater, delVolumeWater } from '@/store/waterAddSlice';
import { getWater } from '@/store/waterGetSlice';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { UserGet, UserGetResponse } from '@/utils/types';
import { GetWaterResponse, WaterData } from '@/utils/types/water';

import css from './WaterTracker.module.scss';
import { WaterVolume } from './WaterVolume';

const MAX_SIZE = 2560;
const CONTAINER_HEIGHT_PX = 238;

export const WaterTracker = () => {
    useBackButton('/');
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const waterVolume = useSelector((state: GetWaterResponse) => state.waterGet);
    const currentUser: UserGet = useSelector((state: UserGetResponse) => state.currentUser);
    // const [currentLevel, setCurrentLevel] = useState(0);
    // const [userChangedSlider, setUserChangedSlider] = useState(false);
    // const [sliderValue, setSliderValue] = useState(0);
    const [adjustedHeight, setAdjustedHeight] = useState(0);

    const [prevSliderValue, setPrevSliderValue] = useState(() => {
        const savedValue = localStorage.getItem('prevSliderValue');
        return savedValue ? parseInt(savedValue, 10) : 0;
    });
    const [sliderValue, setSliderValue] = useState(0);

    useEffect(() => {
        const fetchGetWater = async () => {
            await dispatch(getWater());
            await dispatch(getUser());
        };

        fetchGetWater();
    }, [prevSliderValue]);

    const [containerHeight, setContainerHeight] = useState(CONTAINER_HEIGHT_PX);

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
        setAdjustedHeight((prevSliderValue / MAX_SIZE) * containerHeight);
    }, [prevSliderValue, containerHeight]);

    //console.log(currentUser, 'ffff');

    // useEffect(() => {
    //     setSliderValue(waterVolume.data);
    // }, [waterVolume.data]);

    //console.log(sliderValue, 'sliderValue');

    // const handleSliderChange = (e: BaseSyntheticEvent) => {
    //     const newValue = +e.target.value;
    //     setSliderValue(newValue);
    //     setCurrentLevel(newValue);
    // };

    // const rangeRef = useRef<HTMLDivElement>(null);
    //
    // useEffect(() => {
    //     const scale = (num: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    //         return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    //     };
    //
    //     const range = document.getElementById('range') as HTMLInputElement;
    //     const label = range?.nextElementSibling as HTMLLabelElement;

    //     if (range) {
    //         const rangeWidth = getComputedStyle(range).getPropertyValue('width');
    //         const labelWidth = getComputedStyle(label).getPropertyValue('width');
    //
    //         const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
    //         const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
    //
    //         const max = +range.max;
    //         const min = +range.min;
    //
    //         label.style.left =
    //             sliderValue * (numWidth / max) - numLabelWidth / 2 + scale(sliderValue, min, max, 15, -10) + 'px';
    //         label.innerHTML = sliderValue.toString();
    //
    //         range.style.setProperty('--thumb-after-width', `${sliderValue}%`);
    //     }
    // }, [sliderValue, waterVolume.data]);
    //
    // const handleDecrease = () => {
    //     if (adjustedHeight > 0) {
    //         setSliderValue((prevValue) => Math.max(prevValue - 320, 0));
    //         setCurrentLevel((prevValue) => Math.max(prevValue - 320, 0));
    //         setAdjustedHeight((value) => value - (320 / MAX_SIZE) * CONTAINER_HEIGHT_PX);
    //     }
    // };

    const handleIncrease = async () => {
        if (prevSliderValue < MAX_SIZE - 320) {
            const newValue = prevSliderValue + 320;
            const diff = newValue - prevSliderValue;
            setPrevSliderValue(newValue);
            await dispatch(addVolumeWater({ user_id: currentUser.data.user_id, water_ml: diff }));
            await dispatch(getUser());
        } else {
            const diff = MAX_SIZE - prevSliderValue;
            setPrevSliderValue(MAX_SIZE);
            await dispatch(addVolumeWater({ user_id: currentUser.data.user_id, water_ml: diff }));
            await dispatch(getUser());
        }
    };

    const handleDecrease = async () => {
        if (prevSliderValue > 320) {
            const newValue = prevSliderValue - 320;
            const diff = prevSliderValue - newValue;
            setPrevSliderValue(newValue);
            await dispatch(delVolumeWater({ user_id: currentUser.data.user_id, water_ml: diff }));
            await dispatch(getUser());
        } else {
            setPrevSliderValue(0);
            await dispatch(delVolumeWater({ user_id: currentUser.data.user_id, water_ml: prevSliderValue }));
            await dispatch(getUser());
        }
    };

    // const newValue = +e.target.value;
    // const diff = newValue - prevSliderValue;
    // setPrevSliderValue(newValue);
    // console.log(newValue, 'newValue');
    // console.log(diff, 'diff');
    // const idUser = currentUser.data.user_id;
    // dispatch(addVolumeWater({ user_id: idUser, water_ml: diff }));
    // dispatch(getWater());
    // setSliderValue(newValue);
    // console.log(sliderValue, 'sliderValue');
    // console.log(prevSliderValue, 'prevSliderValue');

    // const handleSliderMouseUp = (e: BaseSyntheticEvent) => {
    //     const value = e.target.value;
    //     const idUser = currentUser.data.user_id;
    //
    //     // const newValue = Math.min(value, MAX_SIZE);
    //
    //     dispatch(addVolumeWater({ user_id: idUser, water_ml: +value }));
    //     dispatch(getWater());
    //     setSliderValue(waterVolume.data.data);
    //     // setAdjustedHeight((newValue / MAX_SIZE) * CONTAINER_HEIGHT_PX);
    // };

    const handleSliderChange = async (e: BaseSyntheticEvent) => {
        const newValue = +e.target.value;
        const diff = newValue - waterVolume.data.data;
        setPrevSliderValue(newValue);

        const idUser = currentUser.data.user_id;

        if (diff > 0) {
            await dispatch(addVolumeWater({ user_id: idUser, water_ml: diff }));
        } else if (diff < 0) {
            await dispatch(delVolumeWater({ user_id: idUser, water_ml: -diff }));
        }

        await dispatch(getWater());
        await dispatch(getUser());
    };

    // const handleSliderMouseUp = (e: BaseSyntheticEvent) => {
    //     const value = +e.target.value;
    //     const idUser = currentUser.data.user_id;
    //     const diff = value - prevSliderValue;
    //     dispatch(addVolumeWater({ user_id: idUser, water_ml: diff }));
    //     dispatch(getWater());
    //     setSliderValue(value);
    //     console.log(sliderValue, 'sliderValue');
    //     console.log(prevSliderValue, 'prevSliderValue');
    // };

    // const handleSliderMouseDown = (e: BaseSyntheticEvent) => {
    //     const value = +e.target.value;
    //     const diff = prevSliderValue - value;
    //     setPrevSliderValue(value);
    //     dispatch(delVolumeWater({ user_id: currentUser.data.user_id, water_ml: diff })); // Уменьшаем объем воды
    //     dispatch(getWater());
    //     setSliderValue(value);
    //     console.log(sliderValue, 'sliderValue');
    //     console.log(prevSliderValue, 'prevSliderValue');
    // };

    // const handleSliderMouseDown = (e: BaseSyntheticEvent) => {
    //     const value = e.target.value ?? 0;
    //     setAdjustedHeight((value / MAX_SIZE) * CONTAINER_HEIGHT_PX);
    // };

    return (
        <div className={css.waterTrackerWrapper}>
            <WaterWaveImage />
            <div className={css.waterTracker}>
                <HeaderPage title="Вода" className={css.waterHeader} />
                <WaterVolume sliderValue={waterVolume.data.data} />
            </div>
            <div className={css.range}>
                <div className={css.cupIcon}>
                    <CupIcon />
                </div>
                <div className={css.field}>
                    <button onClick={handleDecrease} className={cs(css.controlsWater, css.minusIcon)}>
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
                                max="2560"
                                value={waterVolume.data.data}
                                onChange={handleSliderChange}
                                // onTouchStart={handleSliderMouseUp }
                                // onTouchEnd={handleSliderMouseDown}
                                /*  onMouseDown={handleSliderMouseDown}
                                onMouseUp={handleSliderMouseUp}*/
                                className={css.rangeInput}
                            />
                            <label htmlFor="range">{waterVolume.data.data}</label>
                        </div>
                    </div>
                    <button onClick={handleIncrease} className={cs(css.controlsWater, css.plusIcon)}>
                        <div className={css.ml}>мл</div>
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <button disabled className={css.addGlass}>
                <div className={css.addGlassIcon}>
                    <CupBlackIcon />
                </div>
                <p className={css.addGlassText}>Добавить стакан&nbsp;+</p>
            </button>
        </div>
    );
};
