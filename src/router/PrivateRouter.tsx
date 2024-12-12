import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { useAuth } from '../hooks/useAuth';
import { DashboardPage, ExpensesPage, StatementsPage } from '../pages';
import { MainLayout } from '../layouts';

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
                <Route path='/expenses' element={<ExpensesPage />} />
                <Route path='/statements' element={<StatementsPage />} />

                {/* <Route path='/settings' element={<SettingsPage />} /> */}
                
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </MainLayout>
    );
};
