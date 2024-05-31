import css from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={css.container}>
            <div className={css.loader}></div>
        </div>
    );
};
