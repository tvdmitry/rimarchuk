import { LoadingStatus } from '@/constants';

export type Affirmation = {
    id: string | number;
    affirmation: string;
};

export type AllAffirmations = {
    data: Affirmation[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type AffirmationEdit = {
    message: string;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type AffirmationResponse = {
    affirmation: AllAffirmations;
};

export type AffirmationEditResponse = {
    message: string;
};
