import { enqueueSnackbar } from 'notistack';

import { LoginForm, RegisterForm } from '../types';
import { callLoginApi, callRegisterApi, callRenewTokenApi } from '../api';
import { useAuthStore } from '../store/auth';
import { useWalletStore } from '../store/wallet';

export const useAuth = () => {
    const setUserData = useAuthStore((store) => store.setUserData);
    const deleteUserData = useAuthStore((store) => store.deleteUserData);
    const isLoggedIn = useAuthStore((store) => store.isLoggedIn());
    const clearWalletData = useWalletStore((store) => store.clear);

    const renewToken = async () => {
        try {
            const userData = await callRenewTokenApi();
            setUserData(userData);
        } catch (error) {
            clearAllData();
            enqueueSnackbar(`${error}`, { variant: 'error' });
            console.debug(error);
            throw new Error(`Error calling renewToken API: ${error}`);
            
        }
    };

    const login = async (loginData: LoginForm) => {
        try {
            const userData = await callLoginApi(loginData);
            setUserData(userData);

            enqueueSnackbar(`Bienvenido ${loginData.username}`, { variant: 'success' });
        } catch (error) {
            // enqueueSnackbar(`${error}`, { variant: 'error' });
            console.error(error);
        }
    };

    const register = async (registerData: RegisterForm) => {
        try {
            const userData = await callRegisterApi(registerData);
            setUserData(userData);
        } catch (error) {
            console.error(error);
        }
    };

    const clearAllData = () => {
        deleteUserData();
        clearWalletData();
    };

    const logout = () => {
        clearAllData();
        enqueueSnackbar('Ha cerrado sesión', { variant: 'info' });
    };

    return {
        isLoggedIn,
        renewToken,
        register,
        login,
        logout,
    };
};
