import { ExpenseStatusEnum, ExpenseTypeEnum } from '../../types/enums';
import { Payment } from './payment.interface';

export interface Expense {
    title: string;
    ccName: string;
    acquiredAt: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    firstPaymentDate: string;
    creditCardId: number;
    id: number;
    status: ExpenseStatusEnum;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
    payments: Payment[];
}