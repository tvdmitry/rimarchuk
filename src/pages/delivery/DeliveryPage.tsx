import { SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { ThunkDispatch } from '@reduxjs/toolkit';
import cs from 'classnames';

import { CustomInput } from '@/modules/inputs/CustomInput';
import { payContent, payContentManual } from '@/store/payContentSlice';
import { useBackButton } from '@/utils/hooks/useBackButton';

import css from './DeliveryPage.module.scss';
import { IAddress, useDeliveryPage } from './useDeliveryPage';

const DeliveryPage = () => {
    useBackButton('/');
    const [isFormValid, setIsFormValid] = useState(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const price = +searchParams.get('price');
    const deliveryContent = searchParams.get('delivery');

    const { id } = useParams();

    const {
        values: {
            formik: { handleChange, values, errors },
        },
    } = useDeliveryPage();

    const formFieldTitle: Record<keyof IAddress, string> = {
        name: 'ФИО',
        phone: 'Телефон',
        email: 'Email',
    };

    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();

        const customer_phone = values.phone;
        const customer_email = values.email;

        // const apiToken = localStorage.getItem('api_token');

        // console.log(Cookies.get('api_token'), 'Cookies.get');

        if (deliveryContent === 'course') {
            dispatch(
                payContent({
                    customer_phone,
                    customer_email,
                    cost: +price,
                    course_id: +id,
                })
            );
        }

        if (deliveryContent === 'manual') {
            dispatch(
                payContentManual({
                    customer_phone,
                    customer_email,
                    cost: +price,
                    manuals_id: +id,
                })
            );
        }
    };

    useEffect(() => {
        setIsFormValid(Object.keys(errors).length === 0);
    }, [errors]);

    return (
        <div className={css.deliveryPage}>
            <h1 className={css.deliveryHeader}>Данные для покупки</h1>

            <form className={css.deliveryForm} onSubmit={handleSubmit}>
                {Object.keys(formFieldTitle).map((key) => (
                    <CustomInput
                        key={key}
                        name={key}
                        value={values[key as keyof IAddress]}
                        title={formFieldTitle[key as keyof IAddress]}
                        error={errors[key as keyof IAddress]}
                        onChange={handleChange}
                    />
                ))}
                <button
                    disabled={!isFormValid}
                    type="submit"
                    className={cs(css.contentPriceButton, isFormValid ? '' : css.disabledButton)}
                >
                    Перейти к оплате
                </button>
            </form>
        </div>
    );
};

export default DeliveryPage;
