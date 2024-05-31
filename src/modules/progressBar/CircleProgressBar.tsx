import React, { FC } from 'react';

import css from './CircleProgressBar.module.scss';

export type CircleProgressBarProps = {
    percent: number;
    circleWidth?: number;
};

export const CircleProgressBar: FC<CircleProgressBarProps> = (props) => {
    const { percent, circleWidth } = props;

    const radius = 35;
    const innerRadius = 35;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - (dashArray * +percent) / 100;
    const strokeDashoffsetValue = 18;

    let emoji;

    switch (true) {
        case percent <= 20:
            emoji = '😓';
            break;
        case percent <= 40:
            emoji = '😢';
            break;
        case percent <= 60:
            emoji = '😊';
            break;
        case percent <= 80:
            emoji = '😘';
            break;
        case percent <= 99:
            emoji = '🥰';
            break;
        case percent === 100:
            emoji = '🤩';
            break;
        default:
            emoji = '🙂';
            break;
    }

    return (
        <div className={css.circleProgressBar}>
            <svg width={circleWidth} height={circleWidth} viewBox={`0 0 ${circleWidth} ${circleWidth}`}>
                <defs>
                    <linearGradient id="gradient">
                        <stop offset="10%" stopColor="#171554" />
                        <stop offset="50%" stopColor="#20508E" />
                    </linearGradient>
                </defs>
                <circle
                    cx={Number(circleWidth) / 2}
                    cy={Number(circleWidth) / 2}
                    strokeWidth="10px"
                    r={radius}
                    className={css.circleBackground}
                    stroke="url(#gradient)"
                />
                <circle
                    cx={Number(circleWidth) / 2}
                    cy={Number(circleWidth) / 2}
                    strokeWidth="10px"
                    r={innerRadius}
                    className={css.circleProgress}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset + strokeDashoffsetValue,
                    }}
                    transform={`rotate(90 ${Number(circleWidth) / 2} ${Number(circleWidth) / 2})`}
                    stroke="url(#gradient)"
                />
                <text
                    x={Number(circleWidth) / 2}
                    y={Number(circleWidth) / 2 + 2}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="30px"
                    fill="white"
                >
                    {emoji}
                </text>
            </svg>
            <div className={css.percent}>
                <span className={css.number}>{percent}%</span>
            </div>
        </div>
    );
};
