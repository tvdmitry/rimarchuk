import { LoadingStatus } from '@/constants';

export type HttpResponse<T> = {
    data: T;
};

export type StoreState<T> = HttpResponse<Partial<T>> & {
    status: LoadingStatus;
};

export type ArrayStoreState<T> = HttpResponse<T> & {
    status: LoadingStatus;
};
