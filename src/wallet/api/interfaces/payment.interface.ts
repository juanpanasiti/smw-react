import { PaymentStatusEnum } from '../../enums';

export interface Payment {
    id: number;
    expenseId: number;
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}
