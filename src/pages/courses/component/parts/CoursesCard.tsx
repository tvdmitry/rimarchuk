import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import ArrowRight from '@/assets/images/courses/arrowRight.svg';
import { ICourses } from '@/utils/types/courses';

import css from './CoursesCard.module.scss';

export type CoursesCardProps = {
    course: ICourses;
};

export const CoursesCard: FC<CoursesCardProps> = (props) => {
    const { course } = props;
    const { card, title } = course;

    return (
        <div className={css.coursesWrapper}>
            <div className={css.coursesTitle}>{title}</div>
            {card?.map((entry) => (
                <Link key={entry.id} to={`/course/card/${entry.id}`} className={css.courseCard}>
                    <img src={entry.image} className={css.courseBackIcon} alt="iconCourse" />
                    <div className={css.courseText}>
                        <div className={css.title}>{entry?.title}</div>
                        <div className={css.description}>{entry?.description}</div>
                    </div>
                    <div className={css.courseIcon}>
                        <ArrowRight />
                    </div>
                </Link>
            ))}
        </div>
    );
};
