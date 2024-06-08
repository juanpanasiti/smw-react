import { Expense } from "./expense.interface";

export interface CreditCard {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: Date;
    nextExpiringDate: Date;
    mainCreditCardId?: number;
    isMainCreitCard: boolean;
    totalSpent: number;
    isEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    expenses: Expense[];
}
