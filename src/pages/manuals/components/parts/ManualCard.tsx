import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import cs from 'classnames';

import ManualBook from '@/assets/images/manuals/book.svg';
import BuyBook from '@/assets/images/manuals/buy.svg';
import DownloadBook from '@/assets/images/manuals/download.svg';
import { Manuals } from '@/utils/types/manuals';

import css from './ManualCard.module.scss';

export type ManualCardProps = Manuals & {
    index?: number;
    className?: any;
    isPage?: boolean;
};

export const ManualCard: FC<ManualCardProps> = (props) => {
    const { name, description, cost, id } = props;

    return (
        <div className={css.manualCard}>
            <Link to={`/manual/${id}`} className={css.manualLink}>
                <div className={cs(css.iconColumn, css.manualIcon)}>
                    <ManualBook />
                </div>
                <div className={css.blockManual}>
                    <div className={css.textColumn}>
                        <div className={css.title}>{name}</div>
                        <div className={css.description}>{description}</div>
                    </div>
                    <div className={cs(css.iconColumn, css.downloadIcon)}>{cost ? <BuyBook /> : <DownloadBook />}</div>
                </div>
            </Link>
        </div>
    );
};
