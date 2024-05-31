import axios from '@/axios';
import { GetCheckPay, Pay, PayMessage } from '@/utils/types/pay';

export const getCheckPayRequest = async (): Promise<GetCheckPay> => {
    const response = await axios.get(`/api/prodamus/check_pay`);
    // console.log(response.data, 'getCheckPayRequest1111');
    return response.data;
};

export const payContentCourseRequest = async ({
    customer_phone,
    customer_email,
    cost,
    course_id,
}: Pay): Promise<PayMessage> => {
    try {
        const response = await axios.post(
            `/api/prodamus/pay?customer_phone=${customer_phone}&customer_email=${customer_email}&cost=${+cost}&course_id=${+course_id}`
        );

        console.log(response.data, 'rrrrrrrr');
        if (response.data.pay_url) {
            window.location.href = response.data.pay_url;

            return response.data;
        } else {
            console.error('Отсутствует URL для редиректа');
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
};

export const payContentManualRequest = async ({
    customer_phone,
    customer_email,
    cost,
    manuals_id,
}: Pay): Promise<PayMessage> => {
    try {
        const response = await axios.post(
            `/api/prodamus/pay?customer_phone=${customer_phone}&customer_email=${customer_email}&cost=${+cost}&manuals_id=${+manuals_id}`
        );

        // console.log(response.data, 'rrrrrrrr');
        if (response.data.pay_url) {
            window.location.href = response.data.pay_url;

            return response.data;
        } else {
            console.error('Отсутствует URL для редиректа');
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
    }
};
