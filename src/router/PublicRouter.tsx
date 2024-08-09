import { Routes, Route, Navigate } from 'react-router-dom';

import { SignInPage, SignUpPage } from '../pages/auth';
import { AuthLayout } from '../layouts';
import { useAuthStore } from '../stores';

export const PublicRouter = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const lastPath = localStorage.getItem('lastPath') || '/';
    if (isLoggedIn) {
        return <Navigate to={lastPath} />;
    }
    return (
        <AuthLayout>
            <Routes>
                <Route path='signin' element={<SignInPage />} />
                <Route path='signup' element={<SignUpPage />} />
                <Route path='/*' element={<Navigate to='/' />} />
            </Routes>
        </AuthLayout>
    );
};
