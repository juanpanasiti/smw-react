// import { enqueueSnackbar } from 'notistack';

import { LoginForm, RegisterForm } from '../types';
import { callLoginApi, callRegisterApi, callRenewTokenApi } from '../api';
import { useAuthStore } from '../store/auth/auth.store';

export const useAuth = () => {
    const setUserData = useAuthStore((store) => store.setUserData);
    const deleteUserData = useAuthStore((store) => store.deleteUserData);
    const isLoggedIn = useAuthStore((store) => store.isLoggedIn());
    // const clearWalletData = useWalletStore((store) => store.clearData);

    const renewToken = async () => {
        try {
            const userData = await callRenewTokenApi();
            setUserData(userData);
        } catch (error) {
            logout()
            alert('Invalid token, please relogin');
            console.error(error)
        }
    };

    const login = async (loginData: LoginForm) => {
        try {
            const userData = await callLoginApi(loginData);
            setUserData(userData);

            // enqueueSnackbar(`Welcome back ${loginData.username}`, { variant: 'success' });
        } catch (error) {
            // enqueueSnackbar(`${error}`, { variant: 'error' });
            console.error(error)
        }
    };

    const register = async (registerData: RegisterForm) => {
        try {
            const userData = await callRegisterApi(registerData)
            setUserData(userData);
        } catch (error) {
            console.error(error)
        }
    }

    const logout = () => {
        deleteUserData();
        // clearWalletData();
    };

    return {
        isLoggedIn,
        renewToken,
        register,
        login,
        logout,
    };
};
