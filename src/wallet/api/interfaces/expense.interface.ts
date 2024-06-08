import { ExpenseStatusApiEnum, ExpenseTypeApiEnum } from '../enums';
import { Payment } from './payment.interface';

export interface Expense {
    title: string;
    cc_name: string;
    acquired_at: Date;
    amount: number;
    type: ExpenseTypeApiEnum;
    installments: number;
    first_payment_date: Date;
    credit_card_id: number;
    id: number;
    status: ExpenseStatusApiEnum;
    remaining_amount: number;
    total_paid: number;
    installments_paid: number;
    installments_pending: number;
    payments: Payment[];
}