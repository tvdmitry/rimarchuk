import React from 'react';

import bookOneSrc from '@/assets/images/bookBlock/book.png';
import bookFourSrc from '@/assets/images/bookBlock/bookFour.png';
import bookThree from '@/assets/images/bookBlock/bookThree.png';
import bookTwoSrc from '@/assets/images/bookBlock/bookTwo.png';
import CardSlider from '@/modules/slider/CardSlider';
import { IBookBlock } from '@/utils/types/book';

import css from './BookBlock.module.scss';
import { BookCard } from './parts/BookCard';
import {SwiperSlide} from "swiper/react";

export const data: IBookBlock[] = [
    {
        id: '1',
        link: true,
        bonus: false,
        book: false,
        title: (
            <div>
                <span className={css.bookTitleCard}>I’M LEGEND</span>
            </div>
        ),
        description: 'Твоё перерождение',
        image: bookOneSrc,
    },
    {
        id: '2',
        link: false,
        bonus: false,
        book: false,
        title: 'Личная консультация от Марины Римарчук',
        contentTitle: 'ЛИЧНАЯ ПРОГРАММА БЕЗ СОПРОВОЖДЕНИЯ ',
        contentInfo: '(Детская или взрослая)',
        contentList: [
            {
                title: 'разбор/назначение анализов',
            },
            {
                title: 'индивидуальный подбор схемы восстановления здоровья',
            },
            {
                title: 'рекомендации по витаминам и добавкам',
            },
            {
                title: 'рекомендации по питанию',
            },
        ],
        descriptionPrice: 'Стоимость',
        price: '5 990',
        buttonText: 'Стоимость',
        buttonBuy: 'Купить',
        description: 'Энергию и ресурс не надо искать - это есть в нашем теле.',
        image: bookTwoSrc,
    },
    {
        id: '3',
        link: false,
        book: false,
        bonus: true,
        title: 'Личная консультация от Марины Римарчук',
        contentTitle: 'ЛИЧНАЯ ПРОГРАММА С СОПРОВОЖДЕНИЕМ 1 МЕСЯЦ',
        contentInfo: '(Детская или взрослая)',
        contentList: [
            {
                title: 'разбор/назначение анализов',
            },
            {
                title: 'индивидуальный подбор схемы восстановления здоровья',
            },
            {
                title: 'рекомендации по витаминам и добавкам',
            },
            {
                title: 'рекомендации по питанию',
            },
            {
                title: 'коррекция программы по необходимости',
            },
        ],
        descriptionPrice: 'Стоимость',
        price: '15 990',
        buttonText: 'Стоимость',
        buttonBuy: 'Купить',
        description: 'Энергию и ресурс не надо искать - это есть в нашем теле.',
        image: bookThree,
    },
    {
        id: '4',
        book: true,
        bonus: false,
        title: (
            <div>
                Книга <span className={css.bookPart}>«Будь здоровым сейчас» </span>+личная консультация
            </div>
        ),
        contentTitle: 'Книга «Будь здоровым сейчас» + личная консультация',
        contentInfo: 'Консультация в подарок:\n' + 'Детская или взрослая (Стоимостью 5000 ₽)',
        contentList: [
            {
                title: 'разбор/назначение анализов',
            },
            {
                title: 'индивидуальный подбор схемы восстановления здоровья',
            },
            {
                title: 'рекомендации по витаминам и добавкам',
            },
            {
                title: 'рекомендации по питанию',
            },
        ],
        descriptionPrice: 'Стоимость печатной книги + консультации',
        price: '5 990',
        buttonText: 'Стоимость печатной книги + консультации',
        buttonBuy: 'Купить',
        description: 'Энергию и ресурс не надо искать - это есть в нашем теле.',
        image: bookFourSrc,
    },
];

export const BookBlock = () => {
    return (
        <div className={css.bookBlock}>
            <CardSlider slidesToShowMobile={1.05}>
                {data?.map((item, index) => (
                  <SwiperSlide key={item.id} >
                      <BookCard {...item} index={index} />
                  </SwiperSlide>
                ))}
            </CardSlider>
        </div>
    );
};
