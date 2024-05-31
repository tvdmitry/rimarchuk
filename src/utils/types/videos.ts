import { LoadingStatus } from '@/constants';

export type AllVideos = {
    data: Videos[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type Videos = {
    id: string | number;
    name: string;
    pic_url: string;
    vid_url: string;
};

export type AllVideosResponse = {
    videos: AllVideos;
};
