import { AuthApiResponse, SignInForm, UserData } from '../../types';

export const parseLoginDataToApi = (loginData: SignInForm): FormData => {
    const formData = new FormData();
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);
    return formData;
};

// export const parseRegisterDataToApi = (registerData: SignUp): ApiRegisterData => {
//     return {
//         username: registerData.username,
//         email: registerData.email,
//         password: registerData.password,
//         first_name: registerData.firstname,
//         last_name: registerData.lastname,
//     };
// };

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
