import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface LocationProviderProps {
    children: React.ReactNode;
}

const LocationProviderInner: FC<LocationProviderProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.key === 'default') {
            const currentLocation = localStorage.getItem('currentLocation');
            if (!currentLocation) return;
            navigate(currentLocation);
        }
        localStorage.setItem('currentLocation', location.pathname);
    }, [location.key]);
    return <>{children}</>;
};

const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
    if (!(window as any)?.Telegram?.WebApp.initData.length) {
        return <>{children}</>;
    } else {
        return <LocationProviderInner>{children}</LocationProviderInner>;
    }
};

export default LocationProvider;
