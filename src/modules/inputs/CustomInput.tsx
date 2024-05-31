import { ChangeEvent } from 'react';

import cs from 'classnames';

import css from './CustomInput.module.scss';

export interface CustomInputProps {
    name: string;
    value: string;
    title: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export const CustomInput = (props: CustomInputProps) => {
    const { title, name, value, onChange, error } = props;

    return (
        <div className={css.customInput}>
            <label htmlFor={name} className={css.label}>
                <input
                    name={name}
                    className={cs(css.field, value.length > 0 && css.fieldFilled)}
                    value={value}
                    onChange={onChange}
                    type={name === 'phone' ? 'tel' : 'text'}
                />
                <p className={css.title}>{title}</p>
            </label>
            {error && <p className={css.error}>{error}</p>}
        </div>
    );
};
