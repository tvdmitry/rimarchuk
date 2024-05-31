import { ReactNode } from 'react';

export interface IStatisticInfoCard {
    id: string | number;
    icon: string;
    title: string;
    description: string;
}

export interface IStatisticLevelContent {
    title: string;
    progress?: {
        component: ReactNode;
        id: string | number;
    };
}

export interface IAccordionContent {
    id: string | number;
    title: string;
    icon?: string;
    content: IStatisticLevelContent[];
}
