import { enqueueSnackbar } from 'notistack';

import { SignInForm } from '../types';
import { callLoginApi } from '../api';
import { useAuthStore } from '../stores';

export const useApiClient = () => {
    const setUserData = useAuthStore((store) => store.setUserData);

    const login = async (loginData: SignInForm) => {
        try {
            const userData = await callLoginApi(loginData);
            setUserData(userData);

            enqueueSnackbar(`Welcome back ${loginData.username}`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    return {
        login,
    };
};
