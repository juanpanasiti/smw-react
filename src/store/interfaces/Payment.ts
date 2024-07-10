import { ExpenseTypeEnum, PaymentStatusEnum } from '../../wallet/types/enums';

export interface Payment {
    id: number;
    expenseId: number;
    creditCardId: number;
    expenseTitle: string;
    expenseCcName: string;
    expenseType: ExpenseTypeEnum;
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}
