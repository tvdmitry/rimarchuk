import axios from '@/axios';
import { AuthUser } from '@/utils/types';
import { Manuals } from '@/utils/types/manuals';

export const getAllManualsRequest = async (): Promise<Manuals[]> => {
    const response = await axios.get(`/api/manuals/getall`);
    return response.data;
};

export const getManualsRequest = async (id: number): Promise<Manuals> => {
    const response = await axios.get(`/api/manuals/get?id=${+id}`);
    return response.data;
};
