import React, { FC, ReactNode } from 'react';
import { useMatch } from 'react-router-dom';

import { InfoBuy } from '@/modules/infoBuy/InfoBuy';
import { useBackButton } from '@/utils/hooks/useBackButton';

import { data } from '../BookBlock';

export type BookInfoProps = {
    children?: ReactNode;
    isShowBook?: boolean;
    isShowManual?: boolean;
};

export const BookInfo: FC<BookInfoProps> = () => {
    useBackButton('/');
    const matchBook = useMatch('/book/:id');

    const id = Number(matchBook?.params.id);
    const infoBuy = data.find((item) => +item.id === +id);

    return <InfoBuy infoBuy={infoBuy} isShowBook={true} id={id} />;
};

export default BookInfo;
