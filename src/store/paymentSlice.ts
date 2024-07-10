import { StateCreator } from 'zustand';

import { Payment } from './interfaces';
import { CreditCardSlice, PurchaseSlice, SubscriptionSlice } from '.';

export interface PaymentSlice {
    payments: Payment[];
    setPayments: (payments: Payment[]) => void;
    addPayment: (payment: Payment) => void;
    updatePayment: (payment: Payment) => void;
    deletePayment: (payment: Payment) => void;
}

export const createPaymentsSlice: StateCreator<CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice, [], [], PaymentSlice> = (set) => ({
    payments: [],
    setPayments: (payments: Payment[]) => set({ payments }),
    addPayment: (payment: Payment) => set((state) => ({ payments: [...state.payments, payment] })),
    updatePayment: (payment: Payment) => set((state) => ({ payments: state.payments.map((cc) => (cc.id === payment.id ? payment : cc)) })),
    deletePayment: (payment: Payment) => set((state) => ({ payments: state.payments.filter((cc) => cc.id !== payment.id) })),
});
