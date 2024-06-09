import { PaymentStatusEnum } from "../../wallet/enums";

export interface Payment {
    id: number;
    expenseId: number;
    // creditCardId: number; // TODO: implement
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}
