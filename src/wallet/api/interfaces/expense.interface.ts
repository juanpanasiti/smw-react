import { ExpenseStatusEnum, ExpenseTypeEnum } from '../../enums';
import { Payment } from './payment.interface';

export interface Expense {
    title: string;
    ccName: string;
    acquiredAt: Date;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    firstPaymentDate: Date;
    creditCardId: number;
    id: number;
    status: ExpenseStatusEnum;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
    payments: Payment[];
}