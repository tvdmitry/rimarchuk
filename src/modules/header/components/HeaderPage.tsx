import { FC } from 'react';

import cs from 'classnames';

import css from './HeaderPage.module.scss';

export type HeaderPageProps = {
    className?: any;
    title?: string;
    lessSize?: boolean;
};

export const HeaderPage: FC<HeaderPageProps> = (props) => {
    const { title, lessSize, className } = props;

    return <div className={cs(css.headerPage, className, lessSize ? css.headerVideoTitle : '')}>{title}</div>;
};
