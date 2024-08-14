export enum PaymentStatusEnum {
    UNCONFIRMED = 'unconfirmed',
    CONFIRMED = 'confirmed',
    PAID = 'paid',
    CANCELED = 'canceled',
    SIMULATED = 'simulated',
}

export enum ExpenseStatusEnum {
    ACTIVE = 'active',
    FINISHED = 'finished',
}

export enum ExpenseTypeEnum {
    PURCHASE = 'purchase',
    SUBSCRIPTION = 'subscription',
}

export enum PeriodStatusEnum {
    PENDING = 'pending',
    PAID = 'paid',
}
