import { apiRenewToken } from '../api';

export const saveToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const renewToken = async (): Promise<boolean> => {
    try {
        const currentToken = getToken();
        if (!currentToken) return false;
        console.log('token')
        const { token } = await apiRenewToken();
        saveToken(token);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
