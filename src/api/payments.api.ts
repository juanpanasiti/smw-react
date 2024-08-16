import { ExpensePayment, Payment, PaymentApiResponse } from '../types';
import apiClient from './apiClient';
import { parsePaymentFromApi } from './parsers';

export const callUpdatePaymentApi = async ({ amount, status, id, expenseId }: Payment): Promise<ExpensePayment> => {
    const updateData = { amount, status };
    const { data } = await apiClient.put<PaymentApiResponse>(`/expenses/${expenseId}/payments/${id}`, updateData);
    return parsePaymentFromApi(data);
};
