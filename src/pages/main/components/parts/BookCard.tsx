import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { IBookBlock } from '@/utils/types/book';

import css from './BookCard.module.scss';

export type BookCardProps = IBookBlock & {
    index?: number;
};

export const BookCard: FC<BookCardProps> = (props) => {
    const { title, description, index, link, id, image, onClick } = props;

    return (
        <div className={css.bookCard} data-index={index}>
            <img src={image} className={css.bookImage} alt="book" />

            <div className={css.bookInfo}>
                <div className={css.bookTitle}>{title}</div>
                <div className={css.bookDescription}>{description}</div>
                <Link
                    to={link ? 'https://t.me/+zI-uvJD24Og2ODVi\n' : `/book/${id}`}
                    className={css.linkBook}
                    onClick={onClick}
                >
                    <div className={css.bookWrapper}>
                        <span className={css.bookDetails}>Подробнее</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};
