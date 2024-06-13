import { Routes, Route, Navigate } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useAuth } from '../../hooks';
import { SmwLayout } from '../layout/SmwLayout';
import { CreditsCardsPage, ExpensesPage, HomePage, PaymentsPage } from '../pages';

export const WalletRoutes = () => {
    const { authQuery } = useAuth();
    if (!authQuery.data?.token) return <Navigate to='/auth/login' />;
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <SmwLayout>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/credit-cards' element={<CreditsCardsPage />} />
                        <Route path='/expenses' element={<ExpensesPage />} />
					<Route path='/payments' element={<PaymentsPage />} /> 
                        <Route path='/*' element={<Navigate to='/' />} />
                    </Routes>
                </SmwLayout>
            </LocalizationProvider>
        </>
    );
};
