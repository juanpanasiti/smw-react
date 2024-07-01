import { removeToken } from '../helpers';
import { LoginData, RegisterData } from '../interfaces';
import { useStore } from '../../store';
import { apiLogin, apiRegister, apiRenewToken } from '../api';

export const useAuth = () => {
    const { authData, setAuthData } = useStore();
    const renewToken = async () => {
        try {
            const authData = await apiRenewToken();
            setAuthData(authData);
        } catch (error) {
            alert('Invalid token, please relogin');
        }
    };
    const register = async (registerData: RegisterData) => {
        try {
            const authData = await apiRegister(registerData);
            setAuthData(authData);
        } catch (error) {
            alert('Error on register. Check your credentials!');
        }
    };
    const login = async (loginData: LoginData) => {
        try {
            const authData = await apiLogin(loginData);
            setAuthData(authData);
        } catch (error) {
            alert('Error on login. Check your credentials!');
        }
    };

    const logout = () => {
        removeToken();
    };

    return {
        authData,
        renewToken,
        register,
        login,
        logout,
    };
};
