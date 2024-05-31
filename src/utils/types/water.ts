import { LoadingStatus } from '@/constants';
import { GetCheckPay } from '@/utils/types/pay';

export type WaterGetData = {
    data: number;
};

export type WaterData = {
    data: WaterGetData;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type GetWaterError = {
    status: LoadingStatus;
    error: WaterGetData;
};

export type GetWaterResponse = {
    waterGet: WaterData;
};

export type AddWaterResponse = {
    message: string;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type AddWater = {
    user_id: string | number;
    water_ml: number;
};
