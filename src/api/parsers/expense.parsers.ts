import { parseDateFromString, parseDateToString } from '../../helpers';
import { Expense } from '../../types';
import { ExpenseResApi, NewExpenseReqApi, UpdateExpenseReqApi } from '../../types/api';
import { NewExpense, UpdateExpense } from '../../types/forms';

export const parseExpenseFromApi = (expense: ExpenseResApi): Expense => {
    return {
        id: expense.id,
        title: expense.title,
        ccName: expense.cc_name,
        acquiredAt: parseDateFromString(expense.acquired_at),
        amount: expense.amount,
        type: expense.type,
        installments: expense.installments,
        firstPaymentDate: parseDateFromString(expense.first_payment_date),
        status: expense.status,
        accountId: expense.account_id,
        remainingAmount: expense.remaining_amount,
        totalPaid: expense.total_paid,
        installmentsPaid: expense.installments_paid,
        installmentsRemaining: expense.installments_pending,
        createdAt: parseDateFromString(expense.created_at),
        updatedAt: parseDateFromString(expense.updated_at),
    };
};

export const parseNewExpenseToApi = (expense: NewExpense): NewExpenseReqApi => {
    return {
        title: expense.title,
        cc_name: expense.ccName,
        acquired_at: parseDateToString(expense.acquiredAt),
        amount: expense.amount,
        type: expense.type,
        installments: expense.installments,
        first_payment_date: parseDateToString(expense.firstPaymentDate),
        account_id: expense.accountId,
    };
};

export const parseUpdateExpenseToApi = (expense: UpdateExpense): UpdateExpenseReqApi => {
    const response: UpdateExpenseReqApi = {};
    if (expense.title) response.title = expense.title;
    if (expense.ccName) response.cc_name = expense.ccName;
    if (expense.amount) response.amount = expense.amount;
    if (expense.acquiredAt) response.acquired_at = parseDateToString(expense.acquiredAt);

    return response;
};
