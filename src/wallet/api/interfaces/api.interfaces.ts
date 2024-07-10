import { ExpenseStatusEnum, ExpenseTypeEnum, PaymentStatusEnum } from '../../types/enums';

//! REQUESTS
export interface CreditCardApiReq {
    alias: string;
    limit: number;
    main_credit_card_id: number | null;
    user_id: number;
    next_closing_date: string;
    next_expiring_date: string;
    is_enabled: boolean;
}
export interface ExpenseApiReq {
    title: string;
    cc_name: string;
    acquired_at: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    first_payment_date: string;
    credit_card_id: number;
}
export interface EditExpenseApiReq {
    title: string;
    cc_name: string;
    acquired_at: string;
    credit_card_id: number;
    amount: number;
}
export interface NewSubscriptionPaymentApiReq {
    status: ExpenseStatusEnum;
    month: number;
    year: number;
    amount: number;
}
export interface EditPaymentAPIReq {
    status: PaymentStatusEnum;
    amount: number;
}

//! RESPONSES
export interface CreditCardApiRes {
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
    expenses: ExpenseApiRes[];
}
export interface ExpenseApiRes {
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
    payments: PaymentApiRes[];
}
export interface PaymentApiRes {
    id: number;
    expense_id: number;
    status: PaymentStatusEnum;
    no_installment: number;
    month: number;
    year: number;
    amount: number;
}
