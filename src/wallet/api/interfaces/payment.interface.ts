import { PaymentStatusEnum } from '../../types/enums';

export interface Payment {
    id: number;
    creditCardId: number;
    expenseId: number;
    expenseTitle: string;
    expenseCcName: string;
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}
