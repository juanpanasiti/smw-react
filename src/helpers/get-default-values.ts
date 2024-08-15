import { Expense, ExpenseTypeEnum } from '../types';
import { calcPaymentDate, getCurrentDate } from './date.helpers';


export const getDefaultExpense = (expenseType: ExpenseTypeEnum): Partial<Expense> => {
    const today = getCurrentDate();

    const defaultExpense: Partial<Expense> = {
        id: undefined,
        acquiredAt: today,
        firstPaymentDate: calcPaymentDate(today, today),
        type: expenseType,
    };
    if (expenseType !== ExpenseTypeEnum.PURCHASE) return defaultExpense

    return {
        ...defaultExpense,
        noInstallments: 1,
    };
};
