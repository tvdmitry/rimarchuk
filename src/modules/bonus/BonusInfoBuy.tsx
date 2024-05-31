import { FC, ReactNode } from 'react';

import BonusIcon from '@/assets/images/infoBuy/bonus.svg';

import css from './BonusInfoBuy.module.scss';

export interface BonusInfoBuyProps {
    children: ReactNode;
}

export const BonusInfoBuy: FC<BonusInfoBuyProps> = (props) => {
    const { children } = props;

    return (
        <div className={css.bonusInfoBuy}>
            <div className={css.bonusInfoIcon}>
                <BonusIcon />
            </div>
            <div className={css.bonusInfoDescription}>
                <span className={css.bonusInfoText}>Бонус:&nbsp;</span>
                {children}
            </div>
        </div>
    );
};
