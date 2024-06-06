export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    acquiredAt: string; // TODO replace with date
    amount: number;
    noInstallments: number;
    status: string; // TODO replace with enum
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
}
