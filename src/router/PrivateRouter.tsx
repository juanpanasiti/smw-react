import { Navigate, Route, Routes } from 'react-router';

import { useAuth } from '../hooks/useAuth';
import { DashboardPage, ExpensesPage, StatementsPage } from '../pages';
import { MainLayout } from '../layouts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export const PrivateRouter = () => {
    const { isLoggedIn } = useAuth();

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
