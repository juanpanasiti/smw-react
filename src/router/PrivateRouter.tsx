import { useEffect } from 'react';

import { Navigate, Route, Routes } from 'react-router';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DashboardPage, ExpensesPage, StatementsPage } from '../pages';
import { MainLayout } from '../layouts';
import { useAuth, useWallet } from '../hooks';

export const PrivateRouter = () => {
    const { isLoggedIn } = useAuth();
    const { setIsLoading, getDataFromApi } = useWallet();

    useEffect(() => {
        setIsLoading(true);
        getDataFromApi();
        return () => {
            setIsLoading(false);
        };
    }, [getDataFromApi, setIsLoading]);

    if (!isLoggedIn) {
        return <Navigate to='/auth/login' />;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MainLayout>
                <Routes>
                    <Route path='/' element={<DashboardPage />} />
                    <Route path='/expenses' element={<ExpensesPage />} />
                    <Route path='/statements' element={<StatementsPage />} />
                    {/* <Route path='/settings' element={<SettingsPage />} /> */}
                    <Route path='/*' element={<Navigate to='/' />} />
                </Routes>
            </MainLayout>
        </LocalizationProvider>
    );
};
