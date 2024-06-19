export interface PeriodChart {
    key: string;
    total: string;
    totalEstimated: string;
}
export interface CreditCardChart {
    key: string;
    total: number;
    color: string;
}

export interface SimplePeriodChart {
    key: string;
    payments: PaymentChart[];
}

export interface PaymentChart {
    key: string;
    total: number;
    color: string;
}
