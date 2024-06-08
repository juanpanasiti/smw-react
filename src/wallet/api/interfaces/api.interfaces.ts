import { ExpenseStatusApiEnum, ExpenseTypeApiEnum, PaymentStatusApiEnum } from '../enums';

//! REQUESTS
export interface CreditCardApiReq {
    alias: string;
    limit: number;
    main_credit_card_id: number | null;
    user_id: number;
    next_closing_date: Date;
    next_expiring_date: Date;
    is_enabled: boolean;
}
export interface ExpenseApiReq {
    title: string;
    cc_name: string;
    acquired_at: Date;
    amount: number;
    type: ExpenseTypeApiEnum;
    installments: number;
    first_payment_date: Date;
    credit_card_id: number;
}
export interface EditExpenseApiReq {
    title: string;
    cc_name: string;
    acquired_at: Date;
    credit_card_id: number;
}
export interface NewSubscriptionPaymentApiReq {
    status: ExpenseStatusApiEnum;
    month: number;
    year: number;
    amount: number;
}
export interface EditPaymentAPIReq {
    status: PaymentStatusApiEnum;
    amount: number;
}

//! RESPONSES
export interface CreditCardApiRes {
    id: number;
    alias: string;
    limit: number;
    user_id: number;
    next_closing_date: Date;
    next_expiring_date: Date;
    main_credit_card_id: number;
    total_spent: number;
    created_at: Date;
    updated_at: Date;
    is_enabled: boolean;
    expenses: ExpenseApiRes[];
}
export interface ExpenseApiRes {
    title: string;
    cc_name: string;
    acquired_at: Date;
    amount: number;
    type: ExpenseTypeApiEnum;
    installments: number;
    first_payment_date: Date;
    credit_card_id: number;
    id: number;
    status: ExpenseStatusApiEnum;
    remaining_amount: number;
    total_paid: number;
    installments_paid: number;
    installments_pending: number;
    payments: PaymentApiRes[];
}
export interface PaymentApiRes {
    id: number;
    expense_id: number;
    status: PaymentStatusApiEnum;
    no_installment: number;
    month: number;
    year: number;
    amount: number;
}
