import { Route, Routes } from 'react-router-dom';

import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { useApiClient } from '../hooks';
import { useEffect, useRef } from 'react';

export const AppRouter = () => {
    const { renewToken } = useApiClient();
    const renewTokenRef = useRef(renewToken);
    useEffect(() => {
        renewTokenRef.current();
    }, []);
    return (
        <Routes>
            <Route path='/auth/*' element={<PublicRouter />} />
            <Route path='/*' element={<PrivateRouter />} />
        </Routes>
    );
};
