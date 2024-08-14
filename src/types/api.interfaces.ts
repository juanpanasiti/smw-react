import { ExpenseStatusEnum, ExpenseTypeEnum, PaymentStatusEnum } from "./api.enums";

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

export interface SignInApiRequest {
    username: string;
    password: string;
}

export interface SignUpApiRequest extends SignInApiRequest {
    email: string;
    first_name: string;
    last_name: string;
}

export interface CreditCardApiRequest {
    alias: string;
    limit: number;
    main_credit_card_id: number | null;
    user_id: number;
    next_closing_date: string;
    next_expiring_date: string;
    is_enabled: boolean;
}

export interface ExpenseApiRequest {
    title: string;
    cc_name: string;
    acquired_at: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    first_payment_date: string;
    credit_card_id: number;
}

export interface EditExpenseApiRequest {
    title: string;
    cc_name: string;
    acquired_at: string;
    credit_card_id: number;
    amount: number;
}

export interface NewSubscriptionPaymentApiRequest {
    status: ExpenseStatusEnum;
    month: number;
    year: number;
    amount: number;
}

export interface EditPaymentAPIRequest {
    status: PaymentStatusEnum;
    amount: number;
}

export interface CreditCardApiResponse {
    id: number;
    alias: string;
    limit: number;
    user_id: number;
    next_closing_date: string;
    next_expiring_date: string;
    main_credit_card_id: number;
    total_spent: number;
    created_at: string;
    updated_at: string;
    is_enabled: boolean;
    expenses: ExpenseApiResponse[];
}

export interface ExpenseApiResponse {
    title: string;
    cc_name: string;
    acquired_at: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    first_payment_date: string;
    credit_card_id: number;
    id: number;
    status: ExpenseStatusEnum;
    remaining_amount: number;
    total_paid: number;
    installments_paid: number;
    installments_pending: number;
    payments: PaymentApiResponse[];
}

export interface PaymentApiResponse {
    id: number;
    expense_id: number;
    status: PaymentStatusEnum;
    no_installment: number;
    month: number;
    year: number;
    amount: number;
}
