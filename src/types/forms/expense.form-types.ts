import { ExpenseTypeEnum } from '../store.types';

export interface NewExpense {
    title: string;
    ccName: string;
    acquiredAt: Date;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    firstPaymentDate: Date;
    accountId: number;
}

export type UpdateExpense = Partial<Pick<NewExpense, 'title' | 'ccName' | 'acquiredAt' | 'amount'>>;

export type UpdateExpenseReqApi = Partial<Pick<NewExpense, 'title' | 'ccName' | 'acquiredAt' | 'amount'>>;

export type IExpenseForm = NewExpense & UpdateExpense;
