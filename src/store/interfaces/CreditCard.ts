export interface CreditCardMain {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: Date;
    nextExpiringDate: Date;
    totalSpent: number;
    subtotalSpent: number;
    createdAt: Date;
    updatedAt: Date;
    isEnabled: boolean;
    extensions: CreditCardExtension[];
}
export interface CreditCardExtension {
    id: number;
    alias: string;
    totalSpent: number;
    createdAt: Date;
    updatedAt: Date;
    isEnabled: boolean;
}
