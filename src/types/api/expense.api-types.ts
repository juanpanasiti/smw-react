import { ExpenseStatusEnum, ExpenseTypeEnum } from '../store.types';
import { PaymentResApi } from './payment.api-types';

export interface ExpenseResApi {
    id: number;
    title: string;
    cc_name: string;
    acquired_at: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    first_payment_date: string;
    status: ExpenseStatusEnum;
    account_id: number;
    remaining_amount: number;
    total_paid: number;
    installments_paid: number;
    installments_pending: number;
    created_at: string;
    updated_at: string;
    payments: PaymentResApi[];
}

export interface NewExpenseReqApi {
    title: string;
    cc_name: string;
    acquired_at: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    first_payment_date: string;
    account_id: number;
}

export type UpdateExpenseReqApi = Partial<Pick<NewExpenseReqApi, 'title' | 'cc_name' | 'acquired_at' | 'amount'>>;
