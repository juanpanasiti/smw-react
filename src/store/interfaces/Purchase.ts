import { ExpenseStatusEnum } from "../../wallet/enums";

export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    acquiredAt: Date;
    amount: number;
    noInstallments: number;
    status: ExpenseStatusEnum;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
}
