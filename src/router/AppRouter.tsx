import { Route, Routes } from 'react-router';

import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<PublicRouter />} />
            <Route path='/*' element={<PrivateRouter />} />
        </Routes>
    );
};
