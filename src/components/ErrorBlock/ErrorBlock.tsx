import { useNavigate } from 'react-router-dom';

import css from './ErrorBlock.module.scss';

export interface ErrorBlockProps {
    code: string | number;
    description: string;
}

export const ErrorBlock = ({ code, description }: ErrorBlockProps) => {
    const navigate = useNavigate();
    return (
        <div className={css.container}>
            <h1 className={css.title}>{code}</h1>
            <p className={css.description}>{description}</p>

            <button title="На главную" className={css.button} onClick={() => navigate('/')} />
        </div>
    );
};
