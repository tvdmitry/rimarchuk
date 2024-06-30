import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { useTelegram } from '@/utils/hooks/useTelegram'

import { ErrorCatch } from '../components/ErrorCatch'
import { store } from '../store'
import { router } from './AppRoutes'

export const App = () => {
    const { expand, enableClosingConfirmation } = useTelegram();
    useEffect(() => {
        expand?.();
    }, [expand]);
    enableClosingConfirmation();
    return (
        <ErrorCatch>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ErrorCatch>
    );
};
