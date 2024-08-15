import { enqueueSnackbar } from 'notistack';

import { SignInForm } from '../types';
import { callLoginApi, callRenewTokenApi } from '../api';
import { useAuthStore, useWalletStore } from '../stores';

export const useAuth = () => {
    const setUserData = useAuthStore((store) => store.setUserData);
    const deleteUserData = useAuthStore((store) => store.deleteUserData);
    const clearWalletData = useWalletStore((store) => store.clearData);

    const renewToken = async () => {
        try {
            const userData = await callRenewTokenApi();
            setUserData(userData);
        } catch (error) {
            alert('Invalid token, please relogin');
        }
    };

    const login = async (loginData: SignInForm) => {
        try {
            const userData = await callLoginApi(loginData);
            setUserData(userData);

            enqueueSnackbar(`Welcome back ${loginData.username}`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    const logout = () => {
        deleteUserData();
        clearWalletData();
    };

    return {
        renewToken,
        login,
        logout,
    };
};
