import { AxiosResponse } from 'axios';
import apiClient from '../../api/apiClient';
import { handleError } from '../../api/errors';
import { parseEditExpenseToApi, parseExpenseFromApi, parseNewExpenseToApi } from './helpers';
import { EditExpenseApiReq, Expense, ExpenseApiReq, ExpenseApiRes } from './interfaces';

export const createExpenseApi = async (data: Expense): Promise<Expense> => {
    try {
        const { data: expense } = await apiClient.post<ExpenseApiRes, AxiosResponse<ExpenseApiRes>, ExpenseApiReq>(
            '/expenses',
            parseNewExpenseToApi(data)
        );
        return parseExpenseFromApi(expense);
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};

export const updateExpenseApi = async (data: Expense): Promise<Expense> => {
    try {
        const { data: expense } = await apiClient.post<ExpenseApiRes, AxiosResponse<ExpenseApiRes>, EditExpenseApiReq>(
            `/expenses/${data.id}`,
            parseEditExpenseToApi(data)
        );
        return parseExpenseFromApi(expense);
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};
