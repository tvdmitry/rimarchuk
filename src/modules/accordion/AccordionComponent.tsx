import React, { FC } from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemState,
} from 'react-accessible-accordion';

import ArrowDown from '@/assets/images/arrowIcon/chevronDown.svg';
import ArrowUp from '@/assets/images/arrowIcon/chevronUp.svg';
import { IAccordionContent } from '@/utils/types/statistic';

import css from './AccordionComponent.module.scss';
import { AccordionItemState as AccordionState } from './types';

export type AccordionComponentProps = {
    data: IAccordionContent[];
    isTasksPage?: boolean;
};

export const AccordionComponent: FC<AccordionComponentProps> = (props) => {
    const { data, isTasksPage } = props;

    console.log(data, '22221111');

    return (
        <Accordion allowZeroExpanded={true} className={css.accordion}>
            {data?.map((entry) => (
                <AccordionItem key={`${entry?.id}-accordion-item`} className={css.accordionItem}>
                    <AccordionItemHeading className={css.accordionHeading}>
                        <AccordionItemButton className={css.accordionButton}>
                            {isTasksPage && (
                                <div className={css.accordionTasksWrapper}>
                                    <img src={entry?.icon} className={css.accordionTasksIcon} alt="task icon" />
                                    <div className={css.accordionTasksTitle}>{entry?.title}</div>
                                </div>
                            )}
                            {!isTasksPage && <div>{entry?.title}</div>}
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel className={css.accordionPanel}>
                        {entry?.content?.map((item) => (
                            <div className={css.accordionLevelContent} key={`${item.progress?.id}-accordion-level`}>
                                <div className={css.accordionLevelTitle}>{item.title}</div>
                                <div>{item.progress?.component}</div>
                            </div>
                        ))}
                    </AccordionItemPanel>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
