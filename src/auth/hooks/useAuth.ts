import { removeToken } from '../helpers';
import { LoginData, RegisterData } from '../interfaces';
import { useStore } from '../../store';
import { apiLogin, apiRegister, apiRenewToken } from '../api';

export const useAuth = () => {
    const authData = useStore((state) => state.authData);
    const setAuthData = useStore((state) => state.setAuthData);
    const deleteAuthData = useStore((state) => state.deleteAuthData);
    const deleteCreditCards = useStore((state) => state.deleteCreditCards);
    const deletePayments = useStore((state) => state.deletePayments);
    const deletePurchases = useStore((state) => state.deletePurchases);
    const deleteSubscriptions = useStore((state) => state.deleteSubscriptions);

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
        deleteCreditCards();
        deletePayments();
        deletePurchases();
        deleteSubscriptions();
        deleteAuthData();
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
