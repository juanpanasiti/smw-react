import { AuthApiResponse, SignInForm, UserData } from '../types';
import apiClient from './apiClient';
import { removeToken, saveToken } from './helpers';
import { parseLoginDataToApi, parseUserInfoResponseFromApi } from './parsers';

export const callLoginApi = async (loginData: SignInForm): Promise<UserData> => {
    removeToken()
    const { data } = await apiClient.post<AuthApiResponse>('/auth/login', parseLoginDataToApi(loginData));
    saveToken(data.access_token);
    return parseUserInfoResponseFromApi(data);
};
