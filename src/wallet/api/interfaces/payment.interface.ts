import { ExpenseTypeEnum, PaymentStatusEnum } from '../../types/enums';

export interface Payment {
    id: number;
    creditCardId: number;
    expenseId: number;
    expenseTitle: string;
    expenseCcName: string;
    expenseType: ExpenseTypeEnum;
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}

export interface NewSubscriptionPayment {
    expenseId: number;
    month:  number;
    year:   number;
    amount: number;
}
