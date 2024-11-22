import { ExpensePayment, NewSubscriptionPayment, Payment, PaymentApiResponse } from '../types';
import apiClient from './apiClient';
import { parseNewSubscriptionPaymentToApi, parsePaymentFromApi } from './parsers';

export const callUpdatePaymentApi = async ({ amount, status, id, expenseId }: Payment): Promise<ExpensePayment> => {
    const updateData = { amount, status };
    const { data } = await apiClient.put<PaymentApiResponse>(`/expenses/${expenseId}/payments/${id}`, updateData);
    return parsePaymentFromApi(data);
};

export const callCreateSubscriptionPaymentApi = async (payment: NewSubscriptionPayment): Promise<ExpensePayment> => {
    const { data } = await apiClient.post<PaymentApiResponse>(`/expenses/${payment.expenseId}/payments/`, parseNewSubscriptionPaymentToApi(payment));
    return parsePaymentFromApi(data);
};
