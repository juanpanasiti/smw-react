export interface NewCreditCard {
    alias: string;
    limit: number;
    mainCreditCardId: number | undefined;
    nextClosingDate?: Date;
    nextExpiringDate?: Date;
}

export type UpdateCreditCard = Partial<NewCreditCard>;

export interface CreditCardOption {
    alias: string;
    id: number;
}
