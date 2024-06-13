import { Payment } from "../../store/interfaces";
import { PaymentStatusEnum, PeriodStatusEnum } from "../types/enums";
import { Period, PeriodObj } from "../types/interfaces";

export const getPeriodName = (payment: Payment): string => {
    return `${payment.month.toString().padStart(2, '0')}-${payment.year}`;
};
export const parseToList = (periodsObj: PeriodObj): Period[] => {
    return Object.keys(periodsObj).map((k) => {
        const payments: Payment[] = periodsObj[k];
        const status: PeriodStatusEnum = payments.every((p) => p.status === PaymentStatusEnum.PAID)
            ? PeriodStatusEnum.PAID
            : PeriodStatusEnum.PENDING;
        const total = payments.reduce((acc, p) => acc + p.amount, 0);
        return {
            id: k,
            month: parseInt(k.split('-')[0]),
            year: parseInt(k.split('-')[1]),
            status,
            payments,
            total,
        };
    });
};
export const sortByPeriod = (payments: Payment[]): Payment[] => payments.sort((a, b) => (a.year === b.year ? a.month - b.month : a.year - b.year));
