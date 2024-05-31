import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTelegram } from './useTelegram';

export const useBackButton = (path?: string) => {
    const { BackButton } = useTelegram();
    const navigate = useNavigate();

    useEffect(() => {
        const goToModulePage = () => navigate(path ?? '/');

        if (BackButton) {
            BackButton.show();
            BackButton.onClick(goToModulePage);
        }

        return () => {
            BackButton?.hide();
            BackButton?.offClick(goToModulePage);
        };
    }, [navigate, path, BackButton]);
};
