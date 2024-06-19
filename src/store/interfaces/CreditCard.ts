export interface CreditCardMain {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: string;
    nextExpiringDate: string;
    totalSpent: number;
    subtotalSpent: number;
    createdAt: string;
    updatedAt: string;
    isEnabled: boolean;
    extensions: CreditCardExtension[];
}
export interface CreditCardExtension {
    id: number;
    alias: string;
    totalSpent: number;
    createdAt: string;
    updatedAt: string;
    isEnabled: boolean;
}

export interface CreditCardSimpleItem {
    id: number;
    alias: string;
    isEnabled: boolean;
    nextClosingDate?: string;
    totalSpent?: number;
}
