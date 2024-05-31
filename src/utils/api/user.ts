import axios from '@/axios';

import { AuthResponse, AuthUser, User, UserGet, UserMessage } from '../types';

export const getAllUsersRequest = async (): Promise<User[]> => {
    const response = await axios.get(`/api/users/getall`);
    return response.data.data;
};

export const addUserRequest = async ({ user_id, user_name }: User): Promise<UserMessage> => {
    const response = await axios.post(`/api/users/add?user_id=${+user_id}&user_name=${user_name}`);
    return response.data;
};

export const auth = async (user_id: number): Promise<AuthUser> => {
    const response = await axios.get(`/api/auth?user_id=${+user_id}`);
    return response.data;
};

export const userGet = async (): Promise<UserGet> => {
    const response = await axios.get(`/api/users/get`);
    return response.data;
};
