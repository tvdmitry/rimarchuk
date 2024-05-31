import { LoadingStatus } from '@/constants';

export type User = {
    user_id: string | number;
    user_name: string;
    water_ml?: number;
    affirmation_id?: number;
    api_token?: string;
    user_img?: string | null;
    lvl_cur?: number;
    lvl_manuals?: number;
    lvl_wather_day?: number;
    podcadst_quantity?: number;
    vid_quantity?: number;
    water_month?: number;
    water_week?: number;
    wather_block?: number;
};

export type UserMessage = {
    message: string;
};

export type UserError = {
    status: LoadingStatus;
    error: User[];
};

export type AllUsers = {
    data: User[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type UserResponse = {
    user: AllUsers;
};

export type AuthUser = {
    user: User[];
    status: LoadingStatus;
    error: LoadingStatus;
};

export type AuthResponse = {
    auth: AuthUser;
};

export type UserGet = {
    data: User;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type UserGetResponse = {
    currentUser: UserGet;
};
