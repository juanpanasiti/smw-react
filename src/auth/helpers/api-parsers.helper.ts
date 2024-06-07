import { ApiRegisterData, ApiUserInfoResponse, AuthData, LoginData, RegisterData } from '../interfaces';

export const parseLoginDataToApi = (loginData: LoginData): FormData => {
    const formData = new FormData();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);
    return formData
};

export const parseRegisterDataToApi = (registerData: RegisterData): ApiRegisterData => {
    return {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        first_name: registerData.firstname,
        last_name: registerData.lastname,
    };
};

export const parseUserInfoResponseFromApi = (userInfoResponse: ApiUserInfoResponse): AuthData => {
    return {
        user: {
            id: userInfoResponse.id,
            username: userInfoResponse.username,
            email: userInfoResponse.email,
            role: userInfoResponse.role,
            createdAt: userInfoResponse.created_at,
            updatedAt: userInfoResponse.updated_at,
        },
        profile: {
            firstname: userInfoResponse.profile.first_name,
            lastname: userInfoResponse.profile.last_name,
        },
        settings: {
            spentAlert: userInfoResponse.profile.spent_alert,
            monthlyPaymentAlert: userInfoResponse.profile.monthly_payment_alert,
        },
        token: userInfoResponse.access_token,
    };
};
