import BookInfo from '@/pages/main/components/parts/BookInfo';
import { useBackButton } from '@/utils/hooks/useBackButton';

import css from './BookInfoPage.module.scss';

const BookInfoPage = () => {
    useBackButton('/');

    return (
        <div className={css.bookInfoPage}>
            <BookInfo />
        </div>
    );
};

export default BookInfoPage;
