import { useEffect, useRef } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { MainLayout } from '../layouts';
import { DashboardPage, ExpensesPage, SettingsPage, StatementsPage } from '../pages';
import { useAuthStore } from '../stores';
import { useWallet } from '../hooks';

export const PrivateRouter = () => {
    const isLoggedIn = useAuthStore((state) => !!state.userData);
    const { updateWalletData } = useWallet();
    const updateWalletDataRef = useRef(updateWalletData);
    useEffect(() => {
        isLoggedIn && updateWalletDataRef.current();
    }, [isLoggedIn]);
    if (!isLoggedIn) {
        return <Navigate to='/auth/signin' />;
    }
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MainLayout>
                <Routes>
                    <Route path='/' element={<DashboardPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                    <Route path='/expenses' element={<ExpensesPage />} />
                    <Route path='/statements' element={<StatementsPage />} />
                    <Route path='/*' element={<Navigate to='/' />} />
                </Routes>
            </MainLayout>
        </LocalizationProvider>
    );
};
