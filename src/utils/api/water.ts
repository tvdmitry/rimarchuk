import axios from '@/axios';
import { UserMessage } from '@/utils/types';
import { AddWater, WaterGetData } from '@/utils/types/water';

export const waterGet = async (): Promise<WaterGetData> => {
    const response = await axios.get(`/api/water/getml`);
    // console.log(response.data, 'get Water 1111');
    return response.data;
};

export const addWaterRequest = async ({ user_id, water_ml }: AddWater): Promise<UserMessage> => {
    const response = await axios.post(`/api/water/addml?user_id=${user_id}&water_ml=${water_ml}`);
    return response.data;
};

export const delWaterRequest = async ({ user_id, water_ml }: AddWater): Promise<UserMessage> => {
    const response = await axios.post(`/api/water/delml?user_id=${user_id}&water_ml=${water_ml}`);
    return response.data;
};
