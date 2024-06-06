export interface Subscription {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    amount: number;
    status: string; // TODO: replace with enum
}
