import { LoadingStatus } from '@/constants';
import { User } from '@/utils/types/user';

export type Pay = {
    customer_phone: string;
    customer_email: string;
    cost: number;
    course_id?: number;
    manuals_id?: number;
};

export type PayMessage = {
    pay_url: string;
};

export type GetCheckPay = {
    course_id: number[];
    manuals_id: number[];
};

export type DataCheckPay = {
    data: GetCheckPay;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type CheckPayError = {
    status: LoadingStatus;
    error: GetCheckPay;
};

export type PayResponse = {
    pay_url: string;
    status: LoadingStatus;
    error: LoadingStatus;
};

export type GetCheckPayResponse = {
    checkPay: DataCheckPay;
};
