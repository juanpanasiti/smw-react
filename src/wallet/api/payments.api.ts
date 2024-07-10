import apiClient from '../../api/apiClient';
import { handleError } from '../../api/errors';
import { NewSubscriptionPayment, Payment } from './interfaces';

export const createSubscriptionPaymentApi = async ({ expenseId, ...payment }: NewSubscriptionPayment): Promise<Payment> => {
    try {
        const response = await apiClient.post<Payment>(`/expenses/${expenseId}/payments`, payment);
        return response.data;
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};
export const updatePaymentStatusApi = async (payment: Payment): Promise<boolean> => {
    try {
        await apiClient.put<Payment>(`/expenses/${payment.expenseId}/payments/${payment.id}`, { status: payment.status });
        return true;
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};

export const updatePaymentAmountApi = async (payment: Payment): Promise<boolean> => {
    try {
        await apiClient.put<Payment>(`/expenses/${payment.expenseId}/payments/${payment.id}?recalculate_amounts=true`, { amount: payment.amount });
        return true;
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};
