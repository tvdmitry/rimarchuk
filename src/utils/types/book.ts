import { ReactNode } from 'react';

export interface IBookContentList {
    title: string;
}

export interface IBookBlock {
    id: string | number;
    title: string | ReactNode;
    image: string;
    bonus?: boolean;
    book?: boolean;
    link?: boolean;
    description: string;
    descriptionPrice?: string;
    price?: string;
    buttonText?: string;
    buttonBuy?: string;
    cost?: number;
    contentTitle?: string;
    contentInfo?: string;
    contentList?: IBookContentList[];
    onClick?: () => void;
}
