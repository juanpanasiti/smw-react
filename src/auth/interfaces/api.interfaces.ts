import { RoleEnum } from '../../common/enums';

//!  Requests
export interface ApiLoginData {
    username: string;
    password: string;
}

export interface ApiRegisterData extends ApiLoginData {
    email: string;
    first_name: string;
    last_name: string;
}

//! Responses
export interface ApiUserInfoResponse {
    id: number;
    username: string;
    email: string;
    role: RoleEnum;
    profile: ApiProfile;
    created_at: string;
    updated_at: string;
    access_token: string;
    token_type: string;
}

export interface ApiProfile {
    first_name: string;
    last_name: string;
    spent_alert: number;
    monthly_payment_alert: number;
}
