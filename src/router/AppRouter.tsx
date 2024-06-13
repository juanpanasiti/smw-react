import { Route, Routes } from 'react-router-dom';

import { WalletRoutes } from '../wallet/routes';
import { AuthRoutes } from '../auth/routes';
import { useAuth } from '../hooks';
import { Loading } from '../common/components';

export const AppRouter = () => {
    const { authQuery } = useAuth();
    if (authQuery.isLoading) {
        return <Loading />;
    }
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/*' element={<WalletRoutes />} />
        </Routes>
    );
};
