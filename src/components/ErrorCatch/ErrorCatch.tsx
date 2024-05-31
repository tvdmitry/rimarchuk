import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorCatchFallback } from './ErrorCatchFallback';

export interface ErrorBoundaryProps {
    children: ReactNode;
}

export const ErrorCatch: FC<ErrorBoundaryProps> = (props) => {
    const { children } = props;

    return <ErrorBoundary fallback={<ErrorCatchFallback />}>{children}</ErrorBoundary>;
};
