import { ExpenseStatusEnum } from "../../wallet/enums";

export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    acquiredAt: string;
    amount: number;
    noInstallments: number;
    firstPaymentDate: string;
    status: ExpenseStatusEnum;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
}
