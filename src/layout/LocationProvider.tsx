import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface LocationProviderProps {
    children: React.ReactNode;
}

const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const currentLocation = localStorage.getItem('currentLocation');
        if (!currentLocation) {
            return;
        }
        navigate(currentLocation);
    }, []);

    useEffect(() => {
        localStorage.setItem('currentLocation', location.pathname);
    }, [location]);

    return <>{children}</>;
};

export default LocationProvider;
