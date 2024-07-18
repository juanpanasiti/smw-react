import { Routes, Route, Navigate } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { DashboardPage, ExpensesPage, SettingsPage, StatementsPage } from '../pages';

export const PrivateRouter = () => {
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
