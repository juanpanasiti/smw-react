import { PaymentStatusEnum } from '../store.types';

export interface PaymentResApi {
    id: number;
    status: PaymentStatusEnum;
    amount: number;
    no_installment: number;
    month: number;
    year: number;
    expense_id: number;
    created_at: string;
    updated_at: string;
}

export interface UpdatePurchasePaymentReqApi {
    amount?: number;
    month?: number;
    year?: number;
    status?: PaymentStatusEnum;
}

export interface NewSubscriptionPaymentReqApi {
    amount: number;
    month: number;
    year: number;
}

export interface UpdateSubscriptionPaymentReqApi {
    amount?: number;
    month?: number;
    year?: number;
    status?: PaymentStatusEnum;
}
