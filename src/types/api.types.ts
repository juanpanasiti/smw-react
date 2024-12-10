export interface AuthApiResponse {
    id: number;
    username: string;
    email: string;
    role: string;
    profile: ProfileApiResponse;
    created_at: Date;
    updated_at: Date;
    access_token: string;
    token_type: string;
}

export interface ProfileApiResponse {
    first_name: string;
    last_name: string;
    spent_alert: number;
    monthly_payment_alert: number;
}
