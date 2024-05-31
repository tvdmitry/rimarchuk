import { LoadingStatus } from '@/constants';

export interface IMeditation {
    id: string | number;
    title: string;
    time: string;
    image?: string;
}

export type Meditations = {
    id: string | number;
    name: string;
    time: string;
    url: string;
};

export type AllMeditations = {
    data: Meditations[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type AllMeditationsResponse = {
    meditations: AllMeditations;
};
