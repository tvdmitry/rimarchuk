import { FC, ReactNode, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ThunkDispatch } from '@reduxjs/toolkit'

import { BonusInfoBuy } from '@/modules/bonus/BonusInfoBuy'
import PDFViewer from '@/modules/pdfViewer/PDFViewer'
import { manualsGet } from '@/store/manualsGetSlice'
import { useBackButton } from '@/utils/hooks/useBackButton'
import { IBookBlock } from '@/utils/types/book'
import { ICourseCard } from '@/utils/types/courses'
import { IManuals, Manuals, ManualsGetResponse } from '@/utils/types/manuals'
import { GetCheckPayResponse } from '@/utils/types/pay'

import css from './InfoBuy.module.scss'

export type InfoBuyProps = {
    children?: ReactNode;
    infoBuy?: IBookBlock | ICourseCard | IManuals | Manuals;
    isShowBook?: boolean;
    isShowManual?: boolean;
    isShowCourse?: boolean;
    id?: string | number;
};

export const InfoBuy: FC<InfoBuyProps> = (props) => {
    const { children, isShowBook, isShowManual, isShowCourse, infoBuy, id } = props;
    const [courseIdList, setCourseIdList] = useState<number[]>([]);
    const [isIdInCourseIdList, setIsIdInCourseIdList] = useState(false);
    const [manualIdList, setManualIdList] = useState<number[]>([]);
    const [isIdInManualIdList, setIsIdInManualIdList] = useState(false);
    const [visibleIndex, setVisibleIndex] = useState(null);

    const toggleVisibility = (index: number) => {
        setVisibleIndex(visibleIndex === index ? null : index);
    };

    useBackButton('/');

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        const fetchManualGet = async () => {
            await dispatch(manualsGet(Number(id)));
        };
        fetchManualGet();
    }, [id, dispatch]);

    const manual = useSelector((state: ManualsGetResponse) => state.manualsGet);
    const courseId = useSelector((state: GetCheckPayResponse) => state.checkPay.data.course_id);
    const manualsId = useSelector((state: GetCheckPayResponse) => state.checkPay.data.manuals_id);

    useEffect(() => {
        if (courseId) {
            setCourseIdList(courseId);
        }
    }, [courseId]);

    useEffect(() => {
        if (manualsId) {
            setManualIdList(manualsId);
        }
    }, [manualsId]);

    useEffect(() => {
        setIsIdInCourseIdList(courseIdList.includes(Number(id)));
    }, [id, courseIdList]);

    useEffect(() => {
        setIsIdInManualIdList(manualIdList.includes(Number(id)));
    }, [id, manualIdList]);

    const ArrowIcon = ({ isVisible }: { isVisible: boolean }) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d={
                    isVisible
                        ? 'M6.43412 10.5657C6.1217 10.2533 6.1217 9.7467 6.43412 9.4343L11.4341 4.4343C11.7465 4.1219 12.2531 4.1219 12.5655 4.4343L17.5655 9.4343C17.8779 9.7467 17.8779 10.2533 17.5655 10.5657C17.2531 10.8781 16.7465 10.8781 16.4341 10.5657L12.7998 6.9314V19C12.7998 19.4418 12.4416 19.8 11.9998 19.8C11.558 19.8 11.1998 19.4418 11.1998 19V6.9314L7.56549 10.5657C7.25307 10.8781 6.74654 10.8781 6.43412 10.5657Z'
                        : 'M17.5655 13.4343C17.8779 13.7467 17.8779 14.2533 17.5655 14.5657L12.5655 19.5657C12.2531 19.8781 11.7465 19.8781 11.4341 19.5657L6.43412 14.5657C6.1217 14.2533 6.1217 13.7467 6.43412 13.4343C6.74654 13.1219 7.25307 13.1219 7.56549 13.4343L11.1998 17.0686V5.00001C11.1998 4.55818 11.558 4.20001 11.9998 4.20001C12.4416 4.20001 12.7998 4.55818 12.7998 5.00001V17.0686L16.4341 13.4343C16.7465 13.1219 17.2531 13.1219 17.5655 13.4343Z'
                }
                fill="#4563FF"
            />
        </svg>
    );

    if (infoBuy?.id === '2' || infoBuy?.id === '3') {
        return (
            <div className={css.infoBuy}>
                {(infoBuy as IBookBlock).content.map((item, index) => (
                    <div key={index} className={css.infoBuyChildren}>
                        <div className={css.contentTitle}>{item.contentTitle}</div>
                        <button className={css.button} onClick={() => toggleVisibility(index)}>
                            {visibleIndex === index ? 'Скрыть описание' : 'Раскрыть описание'}
                            <ArrowIcon isVisible={visibleIndex === index} />
                        </button>
                        <div
                            className={`${css.contentDescription} ${visibleIndex === index ? css.visible : css.hidden}`}
                        >
                            <div>{item.contentInfo}</div>
                            <ul>
                                {item.contentList.map((contentItem, subIndex) => (
                                    <li key={subIndex}>{contentItem.title}</li>
                                ))}
                            </ul>
                            {item.bonus && (
                                <div>
                                    <div style={{ marginBottom: '12px', marginTop: '12px' }}>
                                        <BonusInfoBuy>мини курс «Тело - храм» в подарок</BonusInfoBuy>
                                    </div>
                                    <BonusInfoBuy>печатная книга «Будь здоровым сейчас!»</BonusInfoBuy>
                                </div>
                            )}
                            <div className={css.voiceMessage}></div>
                            <button className={css.button} type="button">
                                Тут клиенты о результатах
                            </button>
                        </div>
                        <div className={css.contentCostPrice}>
                            <div className={css.content}>{item.descriptionPrice}</div>
                            <div className={css.contentPrice}>{item.price} ₽</div>
                        </div>
                        <Link
                            to={{
                                pathname: `/delivery/${id}`,
                                search: `price=${
                                    isShowCourse ? item.price : isShowManual ? infoBuy.cost : ''
                                }&delivery=${isShowCourse ? 'course' : isShowManual ? 'manual' : ''}`,
                            }}
                            className={css.contentPriceButton}
                        >
                            <div className={css.contentPriceLink}>
                                {(isShowCourse || isShowBook) && (
                                    <div className={css.contentPriceText}>{item.buttonBuy}</div>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }

    if (infoBuy?.id === '4') {
        return (
            <div className={css.infoBuy}>
                <div className={css.contentTitle}>{(infoBuy as IBookBlock)?.title}</div>
                <div className={`${css.contentDescription} ${css.visible}`}>
                    {(infoBuy as IBookBlock).content.map((item) => (
                        <div className={css.infoBuyChildren} key={item.contentTitle}>
                            <div style={{ marginBottom: '12px' }} className={css.content}>
                                {item.contentInfo}
                            </div>
                            <ul>
                                {item.contentList?.map((contentItem) => (
                                    <li key={contentItem.title}>{contentItem.title}</li>
                                ))}
                            </ul>
                            {item.bonus && (
                                <div>
                                    <div style={{ marginBottom: '12px', marginTop: '12px' }}>
                                        <BonusInfoBuy>мини курс «Тело - храм» в подарок</BonusInfoBuy>
                                    </div>
                                    <BonusInfoBuy>печатная книга «Будь здоровым сейчас!»</BonusInfoBuy>
                                </div>
                            )}
                            <div className={css.contentCostPrice}>
                                <div className={css.content}>{item.descriptionPrice}</div>
                                <div className={css.contentPrice}>{item.price} ₽</div>
                            </div>
                            <Link
                                to={{
                                    pathname: `/delivery/${id}`,
                                    search: `price=${
                                        isShowCourse ? item.price : isShowManual ? infoBuy.cost : ''
                                    }&delivery=${isShowCourse ? 'course' : isShowManual ? 'manual' : ''}`,
                                }}
                                className={css.contentPriceButton}
                            >
                                <div className={css.contentPriceLink}>
                                    {(isShowCourse || isShowBook) && (
                                        <div className={css.contentPriceText}>{item.buttonBuy}</div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                {(infoBuy as IManuals)?.book && (
                    <PDFViewer pdfUrl="https://content-water.plutus-fin.ru/books/book_1.pdf" />
                )}
            </div>
        );
    }

    return (
        <div className={css.infoBuy}>
            <div className={css.contentTitle}>
                {isShowManual && manual.data ? manual?.data.name : null}
                {isShowCourse && infoBuy?.title}
            </div>
            <div className={`${css.contentDescription} ${css.visible}`}>
                {isShowManual && manual.data ? manual.data.description : null}
            </div>
            <div className={`${css.contentDescription1} ${css.visible}`}>
                {isShowCourse && (infoBuy as ICourseCard)?.contentInfo}
            </div>
            <div className={css.infoBuyChildren}>{children}</div>
            {infoBuy?.id !== '5' && !isIdInCourseIdList && !isIdInManualIdList && !isShowManual ? (
                <div className={css.contentCostPrice}>
                    <div className={css.content}>{(infoBuy as ICourseCard)?.buttonText}</div>
                    <div className={css.contentPrice}>{(infoBuy as ICourseCard)?.price} ₽</div>
                </div>
            ) : null}
            {!isIdInManualIdList && manual.data && isShowManual ? (
                <div className={css.contentCostPrice}>
                    <div className={css.content}>Стоимость методички</div>
                    <div className={css.contentPrice}>{(infoBuy as Manuals)?.cost} ₽</div>
                </div>
            ) : null}
            {infoBuy?.id !== '5' && !isIdInCourseIdList && !isIdInManualIdList && !isShowManual ? (
                <Link
                    to={{
                        pathname: `/delivery/${id}`,
                        search: `price=${
                            isShowCourse ? (infoBuy as ICourseCard).price : isShowManual ? infoBuy?.cost : ''
                        }&delivery=${isShowCourse ? 'course' : isShowManual ? 'manual' : null}`,
                    }}
                    className={css.contentPriceButton}
                >
                    <div className={css.contentPriceLink}>
                        {isShowCourse ? (
                            <div className={css.contentPriceText}>{(infoBuy as ICourseCard)?.buttonBuy}</div>
                        ) : null}
                    </div>
                </Link>
            ) : null}

            {!isIdInManualIdList && manual.data && isShowManual ? (
                <Link
                    to={{
                        pathname: `/delivery/${id}`,
                        search: `price=${
                            isShowCourse ? (infoBuy as Manuals).price : isShowManual ? infoBuy?.cost : ''
                        }&delivery=${isShowCourse ? 'course' : isShowManual ? 'manual' : null}`,
                    }}
                    className={css.contentPriceButton}
                >
                    <div className={css.contentPriceLink}>
                        {isShowManual && !isIdInManualIdList ? (
                            <div className={css.contentPriceText}>Купить методичку</div>
                        ) : null}
                    </div>
                </Link>
            ) : null}
        </div>
    );
};
