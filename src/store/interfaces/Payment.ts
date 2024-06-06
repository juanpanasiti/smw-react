export interface Payment {
    id: number;
    expenseId: number;
    creditCardId: number;
    status: string; // TODO: replace with enum
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}
