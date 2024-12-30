import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { Loading } from '../components/shared';
import { useAuth } from '../hooks';

export const AppRouter = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, renewToken } = useAuth();

    if (isLoading && !isLoggedIn) {
        (async () => {
            try {
                await renewToken();
            } catch (error) {
                console.debug(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }
    if (isLoading) {
        return <Loading />;
    }
    return (
        <Routes>
            <Route path='/auth/*' element={<PublicRouter />} />
            <Route path='/*' element={<PrivateRouter />} />
        </Routes>
    );
};
