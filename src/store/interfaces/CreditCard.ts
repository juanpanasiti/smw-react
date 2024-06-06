export interface CreditCard {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: string; // TODO: replace with date
    nextExpiringDate: string; // TODO: replace with date
    mainCreditCardId: number;
    isMainCreitCard: boolean;
    totalSpent: number;
    isEnabled: boolean;
    createdAt: string; // TODO: change for datetime
    updatedAt: string; // TODO: change for datetime
}
