import { AuthApiResponse, LoginForm, UserData } from '../../types';

export const parseLoginDataToApi = (loginData: LoginForm): FormData => {
    const formData = new FormData();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);
    return formData;
};

export const parseUserInfoResponseFromApi = (userInfoResponse: AuthApiResponse): UserData => {
    return {
        id: userInfoResponse.id,
        username: userInfoResponse.username,
        email: userInfoResponse.email,
        role: userInfoResponse.role,
        firstName: userInfoResponse.profile.first_name,
        lastName: userInfoResponse.profile.last_name,
        spentAlert: userInfoResponse.profile.spent_alert,
        monthlyPaymentAlert: userInfoResponse.profile.monthly_payment_alert,
        createdAt: userInfoResponse.created_at,
        updatedAt: userInfoResponse.updated_at,
    };
};
