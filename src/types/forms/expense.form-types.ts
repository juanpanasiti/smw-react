import { ExpenseTypeEnum } from '../store.types';

export interface NewExpense {
    title: string;
    ccName: string;
    acquiredAt: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    firstPaymentDate: string;
    accountId: number;
}

export type UpdateExpenseReqApi = Partial<Pick<NewExpense, 'title' | 'ccName' | 'acquiredAt' | 'amount'>>;
