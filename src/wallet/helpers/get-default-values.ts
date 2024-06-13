import { Expense } from '../api/interfaces';
import { calcPaymentDate, getCurrentDate } from './date.helpers';

export const getDefaultExpense = (): Partial<Expense> => {
    const today = getCurrentDate();
    return {
        acquiredAt: today,
        firstPaymentDate: calcPaymentDate(today, today),
        installments: 1,
    };
};
