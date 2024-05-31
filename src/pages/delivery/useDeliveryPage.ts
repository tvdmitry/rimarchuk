import { useFormik } from 'formik';
import * as yup from 'yup';

export interface IAddress {
    name: string;
    phone: string;
    email: string;
}

export const useDeliveryPage = () => {
    const validationSchema = yup.object().shape({
        name: yup.string().required('ФИО обязательно к заполнению'),
        email: yup.string().required('Email обязателен к заполнению').email('Введите корректный email'),
        phone: yup
            .string()
            .required('Номер телефона обязателен к заполнению')
            .matches(/^\+7\d{10}$/, 'Введите корректный номер телефона')
            .min(12, 'Минимум 12 символов')
            .max(12, 'Телефон должен быть не более 12 символов'),
    });

    const formik = useFormik<IAddress>({
        initialValues: {
            name: '',
            email: '',
            phone: '+7',
        },
        validationSchema,
        validateOnChange: true,
        validateOnMount: false,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return {
        values: {
            formik,
        },
    };
};
