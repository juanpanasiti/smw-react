import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage, RegisterPage } from '../pages';
import { useAuth } from '../hooks';

export const AuthRoutes = () => {
    const { authData } = useAuth();
    const lastPath = localStorage.getItem('lastPath') || '/';
    if (authData?.token) return <Navigate to={lastPath} />;

    return (
        <Routes>
            <Route path='signin' element={<LoginPage />} />
            <Route path='signup' element={<RegisterPage />} />

            <Route path='/*' element={<Navigate to='/auth/signin' />} />
        </Routes>
    );
};
