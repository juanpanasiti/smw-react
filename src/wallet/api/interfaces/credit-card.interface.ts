import { Expense } from './expense.interface';

export interface CreditCard {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: string;
    nextExpiringDate: string;
    mainCreditCardId?: number;
    isMainCreitCard: boolean;
    totalSpent: number;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    expenses: Expense[];
}
