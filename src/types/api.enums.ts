export enum PaymentStatusEnum {
    UNCONFIRMED = 'unconfirmed',
    CONFIRMED = 'confirmed',
    PAID = 'paid',
    CANCELED = 'canceled',
    SIMULATED = 'simulated',
}

export const PAYMENT_FINISH_STATUSES = [PaymentStatusEnum.PAID, PaymentStatusEnum.CANCELED];

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
