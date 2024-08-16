import { CCExpense, CreditCard, CreditCardApiResponse, Expense, ExpenseApiResponse } from '../types';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { parseCreditCardFromApi, parseExpenseFromApi, parseExpenseToApi, parseExpenseUpdateToApi } from './parsers';

export const callGetCreditCardsApi = async (): Promise<CreditCard[]> => {
    const { data } = await apiClient.get<CreditCardApiResponse[]>(Endpoints.CREDIT_CARDS);
    return data.map(parseCreditCardFromApi);
};

export const callCreateExpenseApi = async (expense: Expense): Promise<CCExpense> => {
    const { data } = await apiClient.post<ExpenseApiResponse>(`${Endpoints.EXPENSES}/`, parseExpenseToApi(expense));
    return parseExpenseFromApi(data);
};
export const callUpdateExpenseApi = async (expense: Expense): Promise<CCExpense> => {
    const { data } = await apiClient.put<ExpenseApiResponse>(`${Endpoints.EXPENSES}/${expense.id}`, parseExpenseUpdateToApi(expense));
    return parseExpenseFromApi(data);
};

export const callDeleteExpenseApi = async (expenseId: number): Promise<void> => {
    await apiClient.delete(`${Endpoints.EXPENSES}/${expenseId}`);
};
