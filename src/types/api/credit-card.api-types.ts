export interface CreditCardResApi {
    id: number;
    alias: string;
    limit: number;
    user_id: number;
    next_closing_date: string;
    next_expiring_date: string;
    main_credit_card_id: number;
    total_spent: number;
    created_at: string;
    updated_at: string;
    is_enabled: boolean;
}

export interface NewCreditCardReqApi {
    alias: string;
    limit: number;
    main_credit_card_id: number;
    user_id: number;
    next_closing_date: string;
    next_expiring_date: string;
}

export type UpdateCreditCardReqApi = Partial<NewCreditCardReqApi>;
