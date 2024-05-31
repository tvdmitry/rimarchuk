import React from 'react';

import { AccordionComponent } from '@/modules/accordion/AccordionComponent';
import { HeaderPage } from '@/modules/header/components/HeaderPage';
import { useBackButton } from '@/utils/hooks/useBackButton';
import { IAccordionContent } from '@/utils/types/statistic';

import css from './QuestionPage.module.scss';

const questionData: IAccordionContent[] = [
    {
        id: '1',
        title: 'Знакомство с приложением',
        content: [
            {
                title: 'Это трансформационное приложение, которое поможет ежедневно работать с мышлением и раскрывать свою жизнь.',
            },
        ],
    },
    {
        id: '2',
        title: 'Что делать, если в приложении что - то не работает ?',
        content: [
            {
                title: 'Если у вас возникли трудности, вам что - то не понятно или вы не можете воспользоваться нужной функцией, напишите в сообщения боту и с вами свяжутся. ',
            },
        ],
    },
    {
        id: '3',
        title: 'Если я хочу задать вопросы лично Марине ?',
        content: [
            {
                title: 'Вы можете задать мне вопрос, написать в телеграмм по ссылке, так как вопросов бывает много, могу ответить вам не сразу, но обязательно ожидайте ❤️ @Marichkarimarchuk',
            },
        ],
    },
    {
        id: '4',
        title: 'Что дают подкасты и бесплатные видео на ютуб ?',
        content: [
            {
                title: 'Они дают возможность окунуться в  важные знания, которые также как и медитации обладают нейропластичностью и способны изменить мышление, помочь стать более уверенным человеком и понять, что мешает на пути к целям.',
            },
        ],
    },
];

const QuestionPage = () => {
    useBackButton('/');

    return (
        <div className={css.questionPage}>
            <HeaderPage title="Ответы на вопросы" />
            <div className={css.questionWrapper}>
                <AccordionComponent data={questionData} />
            </div>
        </div>
    );
};

export default QuestionPage;
