import { FC } from 'react';

import ArrowIcon from '@/assets/images/arrowIcon/chevron.svg';

import css from './CommonHeader.module.scss';

export type CommonHeaderProps = {
    title: string;
};

export const CommonHeader: FC<CommonHeaderProps> = (props) => {
    const { title } = props;

    return (
        <div className={css.commonHeader}>
            <div className={css.headerTitle}>{title}</div>
            <ArrowIcon />
        </div>
    );
};
