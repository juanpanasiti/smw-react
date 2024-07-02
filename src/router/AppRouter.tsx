import { useEffect, useRef } from 'react';

import { Route, Routes } from 'react-router-dom';

import { WalletRoutes } from '../wallet/routes';
import { AuthRoutes } from '../auth/routes';
import { useAuth } from '../auth/hooks';

export const AppRouter = () => {
    const { renewToken } = useAuth();
    const renewTokenRef = useRef(renewToken);

    useEffect(() => {
        renewTokenRef.current();
    }, []);

    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/*' element={<WalletRoutes />} />
        </Routes>
    );
};
