import React, { FC } from 'react';

import cs from 'classnames';

import css from './ProgressBar.module.scss';

export type ProgressBarProps = {
    percent: number | string;
    isMainPage?: boolean;
};

export const ProgressBar: FC<ProgressBarProps> = (props) => {
    const { percent, isMainPage } = props;
    let formattedPercent: string | number = '0%';
    let fractionValue = 0;

    switch (typeof percent) {
        case 'string':
            if (percent.includes('/')) {
                const [numerator, denominator] = percent.split('/');
                fractionValue = Math.floor((parseFloat(numerator) / parseFloat(denominator)) * 100);
                formattedPercent = `${numerator}/${denominator}`;
            }
            break;

        case 'number':
            formattedPercent = `${percent}%`;
            fractionValue = percent;
            break;

        default:
            break;
    }

    return (
        <div className={css.completePercent}>
            <div className={css.completeNumber} style={{ width: `${fractionValue}%` }}>
                <span className={cs(css.number, isMainPage ? css.numberWater : '')}>{formattedPercent}</span>
            </div>
        </div>
    );
};
