import { PaymentStatusApiEnum } from "../enums";

export interface Payment {
    id: number;
    expenseId: number;
    status: PaymentStatusApiEnum
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}