import { Expense, Payment } from '../types';
import { ExpenseResApi, PaymentResApi } from '../types/api';
import { NewSubscriptionPayment, UpdatePurchasePayment, UpdateSubscriptionPayment } from '../types/forms';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { parseExpenseFromApi, parsePaymentFromApi } from './parsers/expense.parsers';

export const callUpdatePurchasePayment = async (paymentData: UpdatePurchasePayment, paymentId: number, purchaseId: number): Promise<Expense> => {
    const { data } = await apiClient.patch<ExpenseResApi>(`${Endpoints.PURCHASES}/${purchaseId}/payments/${paymentId}`, paymentData);
    return parseExpenseFromApi(data);
};

export const callCreateNewSubscriptionPayment = async (
    paymentData: NewSubscriptionPayment,
    subscriptionId: number,
    accountId: number
): Promise<Payment> => {
    const { data } = await apiClient.post<PaymentResApi>(`${Endpoints.SUBSCRIPTIONS}/${subscriptionId}/payments`, paymentData);
    return parsePaymentFromApi(data, accountId);
};

export const callUpdateSubscriptionPayment = async (
    paymentData: UpdateSubscriptionPayment,
    paymentId: number,
    subscriptionId: number,
    accountId: number
): Promise<Payment> => {
    const { data } = await apiClient.patch<PaymentResApi>(`${Endpoints.SUBSCRIPTIONS}/${subscriptionId}/payments/${paymentId}`, paymentData);
    return parsePaymentFromApi(data, accountId);
};

export const callDeleteSubscriptionPayment = async (expenseId: number, paymentId: number): Promise<void> => {
    await apiClient.delete(`${Endpoints.EXPENSES}/${expenseId}/payments/${paymentId}`);
};
