import { ReactNode } from 'react';

import { IBookContentList } from './book';

export interface ILesson {
    title: string;
    description?: string;
    image?: string;
    id: string | number;
    open?: boolean;
    url?: string;
}

export interface ICourseCard {
    title: string;
    description?: string;
    bonus?: boolean;
    book?: boolean;
    icon?: string;
    cost?: number;
    image?: string;
    descriptionPrice?: string;
    contentTitle?: string;
    contentInfo?: string | ReactNode;
    contentList?: IBookContentList[];
    buttonText?: string;
    buttonBuy?: string;
    price?: number;
    buy?: boolean;
    lesson?: ILesson[];
    url?: string;
    id: string | number;
}

export interface ICourses {
    id: string | number;
    title: string;
    description?: string;
    icon?: string;
    image?: string;
    contentTitle?: string;
    contentInfo?: string;
    contentList?: IBookContentList[];
    buttonText?: string;
    buttonBuy?: string;
    price?: number;
    buy?: boolean;
    card: ICourseCard[];
}
