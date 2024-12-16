export interface NewCreditCard {
    alias: string;
    limit: number;
    mainCreditCardId: number;
    userId: number;
    nextClosingDate: string;
    nextExpiringDate: string;
}

export type UpdateCreditCard = Partial<NewCreditCard>;
