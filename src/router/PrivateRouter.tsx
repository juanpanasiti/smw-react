import { Navigate, Route, Routes } from 'react-router';

import { useAuth } from '../hooks/useAuth';
import { DashboardPage } from '../pages';
import { MainLayout } from '../layouts';
import { useEffect, useRef } from 'react';

export const PrivateRouter = () => {
    const { isLoggedIn, renewToken } = useAuth();
    const renewTokenRef = useRef(renewToken);
    useEffect(() => {
        renewTokenRef.current();
    }, []);
    if (!isLoggedIn) {
        return <Navigate to='/auth/login' />;
    }

    return (
        <MainLayout>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                {/* <Route path='/settings' element={<SettingsPage />} /> */}
                {/* <Route path='/expenses' element={<ExpensesPage />} /> */}
                {/* <Route path='/statements' element={<StatementsPage />} /> */}
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </MainLayout>
    );
};
