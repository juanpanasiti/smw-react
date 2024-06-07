import { AxiosResponse } from 'axios';
import apiClient from '../../api/apiClient';
import { ApiRegisterData, ApiUserInfoResponse, AuthData, LoginData, RegisterData } from '../interfaces';
import { parseLoginDataToApi, parseRegisterDataToApi, parseUserInfoResponseFromApi, saveToken } from '../helpers';

export const apiLogin = async (loginData: LoginData): Promise<AuthData> => {
    localStorage.removeItem('token');

    const { data } = await apiClient.post<ApiUserInfoResponse>('/auth/login', parseLoginDataToApi(loginData));
    saveToken(data.access_token);
    return parseUserInfoResponseFromApi(data);
};

export const apiRegister = async (registerData: RegisterData): Promise<AuthData> => {
    const { data } = await apiClient.post<ApiUserInfoResponse, AxiosResponse<ApiUserInfoResponse>, ApiRegisterData>(
        '/auth/register',
        parseRegisterDataToApi(registerData)
    );
    saveToken(data.access_token);
    return parseUserInfoResponseFromApi(data);
};

export const apiRenewToken = async (): Promise<AuthData> => {
    console.log('apiRenewToken')
    const { data } = await apiClient.get<ApiUserInfoResponse>('/auth/token');
    saveToken(data.access_token);
    return parseUserInfoResponseFromApi(data);
};
