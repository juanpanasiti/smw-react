import { PaymentStatusEnum } from '../store.types';

export interface UpdatePurchasePayment {
    amount?: number;
    month?: number;
    year?: number;
    status?: PaymentStatusEnum;
}

export interface NewSubscriptionPayment {
    amount: number;
    month: number;
    year: number;
}

export interface UpdateSubscriptionPayment {
    amount?: number;
    month?: number;
    year?: number;
    status?: PaymentStatusEnum;
}
