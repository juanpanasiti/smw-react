import { Expense } from '../types';
import { ExpenseResApi } from '../types/api';
import { NewExpense, UpdateExpense } from '../types/forms';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { parseExpenseFromApi, parseNewExpenseToApi, parseUpdateExpenseToApi } from './parsers/expense.parsers';

export const callGetExpenseListApi = async (limit: number, offset: number): Promise<Expense[]> => {
    const queryParams = {
        limit,
        offset,
    };
    const { data } = await apiClient.get<ExpenseResApi[]>(Endpoints.EXPENSES, { params: { ...queryParams } });
    return data.map(parseExpenseFromApi);
};

export const getAllExpensesApi = async (): Promise<Expense[]> => {
    const limit = 100;
    let offset = 0;
    let allExpenses: Expense[] = [];
    let hasMore = true;

    while (hasMore) {
        const expenses = await callGetExpenseListApi(limit, offset);
        allExpenses = allExpenses.concat(expenses);

        hasMore = expenses.length === limit;
        offset += limit;
    }

    return allExpenses;
};

export const callCreateNewExpenseApi = async (expenseData: NewExpense) => {
    const { data } = await apiClient.post<ExpenseResApi>(Endpoints.EXPENSES, parseNewExpenseToApi(expenseData));
    return parseExpenseFromApi(data);
};

export const callUpdateExpenseApi = async (expenseData: UpdateExpense, expenseId: number) => {
    const { data } = await apiClient.patch<ExpenseResApi>(`${Endpoints.EXPENSES}/${expenseId}`, parseUpdateExpenseToApi(expenseData));
    return parseExpenseFromApi(data);
};

export const callDeleteExpenseApi = async (expenseId: number) => {
    await apiClient.delete(`${Endpoints.EXPENSES}/${expenseId}`);
};
