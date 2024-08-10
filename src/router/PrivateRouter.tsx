import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { DashboardPage, ExpensesPage, SettingsPage, StatementsPage } from '../pages';
import { useAuthStore } from '../stores';

export const PrivateRouter = () => {
    const isLoggedIn = useAuthStore((state) => !!state.userData);
    if (!isLoggedIn) {
        return <Navigate to='/auth/signin' />;
    }
    return (
        <MainLayout>
            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/expenses' element={<ExpensesPage />} />
                <Route path='/statements' element={<StatementsPage />} />
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </MainLayout>
    );
};
