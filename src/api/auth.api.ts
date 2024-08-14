import { AuthApiResponse, SignInForm, UserData } from '../types';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { removeToken, saveToken } from './helpers';
import { parseLoginDataToApi, parseUserInfoResponseFromApi } from './parsers';

export const callLoginApi = async (loginData: SignInForm): Promise<UserData> => {
    removeToken()
    const { data } = await apiClient.post<AuthApiResponse>(Endpoints.AUTH_LOGIN, parseLoginDataToApi(loginData));
    saveToken(data.access_token);
    return parseUserInfoResponseFromApi(data);
};

export const callRenewTokenApi = async (): Promise<UserData> => {
    const { data } = await apiClient.get<AuthApiResponse>(Endpoints.AUTH_TOKEN);
    saveToken(data.access_token);
    return parseUserInfoResponseFromApi(data);
};
