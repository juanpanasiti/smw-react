import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from '../pages';
import { RegisterPage } from '../pages/RegisterPage';
import { useAuth } from '../hooks';

export const PublicRouter = () => {
    const { isLoggedIn } = useAuth();
    const lastPath = localStorage.getItem('lastPath') || '/';
    if (isLoggedIn) {
        return <Navigate to={lastPath} />;
    }

    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
        </Routes>
    );
};
