export interface NewCreditCard {
    alias: string;
    limit: number;
    mainCreditCardId?: number;
    nextClosingDate?: Date;
    nextExpiringDate?: Date;
}

export type UpdateCreditCard = Partial<NewCreditCard>;

export type ICreditCardForm = NewCreditCard | UpdateCreditCard;

export interface CreditCardOption {
    alias: string;
    id: number;
}
