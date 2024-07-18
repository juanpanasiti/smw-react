import { Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage, SignUpPage } from '../pages/auth';

export const PublicRouter = () => {
    return (
        <Routes>
            <Route path='signin' element={<SignInPage />} />
            <Route path='signup' element={<SignUpPage />} />

            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    );
};
