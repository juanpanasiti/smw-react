import { ExpenseStatusEnum } from '../../wallet/enums';

export interface Subscription {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    amount: number;
    status: ExpenseStatusEnum;
    acquiredAt: string;
    firstPaymentDate: string;
}
