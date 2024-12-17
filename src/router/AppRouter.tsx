import { useState } from 'react';
import { Route, Routes } from 'react-router';

import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/shared';
import { useWallet } from '../hooks/useWallet';

export const AppRouter = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { isLoggedIn, renewToken } = useAuth();
    const { getDataFromApi } = useWallet();

    if (isLoading && !isLoggedIn) {
        (async () => {
            try {
                await renewToken();
                await getDataFromApi();
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
