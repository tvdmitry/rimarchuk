import { ReactNode } from 'react'

export interface IBookContentList {
    title: string;
}

export interface IBook {
    contentTitle?: string;
    contentInfo?: string;
    contentList?: IBookContentList[];
    buttonText?: string;
    buttonBuy?: string;
    price?: string;
    descriptionPrice?: string;
    bonus?: boolean;
    voiceMessage?: boolean;
}

export interface IBookBlock {
    id: string | number;
    title: string | ReactNode;
    image: string;
    book?: boolean;
    link?: boolean;
    description: string;
    cost?: number;
    onClick?: () => void;
    buy?: boolean;
    content?: IBook[];
}
