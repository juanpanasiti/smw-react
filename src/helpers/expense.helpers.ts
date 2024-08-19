import { Payment, PaymentStatusEnum } from '../types';

export const calcPaidPercentage = (payments: Payment[]): number => {
    const total = payments.length;
    const paid = payments.filter((p) => p.status === PaymentStatusEnum.PAID).length;
    return (paid / total) * 100;
    
};
