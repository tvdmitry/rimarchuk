import { LoadingStatus } from '@/constants';
import { IBookContentList } from '@/utils/types/book';

export interface IManuals {
    id: string | number;
    title: string;
    book?: boolean;
    bonus?: boolean;
    description: string;
    icon?: string;
    cost?: number;
    image?: string;
    contentTitle?: string;
    descriptionPrice?: string;
    contentInfo?: string;
    contentList?: IBookContentList[];
    buttonText?: string;
    buttonBuy?: string;
    price?: string;
    buy?: boolean;
}

export type Manuals = {
    id: string | number;
    title?: string;
    bonus?: boolean;
    contentTitle?: string;
    book?: boolean;
    contentInfo?: string;
    contentList?: IBookContentList[];
    buttonText?: string;
    descriptionPrice?: string;
    buttonBuy?: string;
    price?: string;
    buy?: boolean;
    name: string;
    description: string;
    cost: number;
    url_file: string;
};

export type AllManuals = {
    data: Manuals[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type ManualResponse = {
    data: Manuals;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type AllManualsResponse = {
    manuals: AllManuals;
};

export type ManualsGetResponse = {
    manualsGet: ManualResponse;
};
