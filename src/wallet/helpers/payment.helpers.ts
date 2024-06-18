import moment from 'moment';
import { Payment, Subscription } from '../../store/interfaces';
import { PaymentStatusEnum, PeriodStatusEnum } from '../types/enums';
import { Period, PeriodObj } from '../types/interfaces';

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
            totalSimulated: 0,
        };
    });
};
export const sortByPeriod = (payments: Payment[]): Payment[] => payments.sort((a, b) => (a.year === b.year ? a.month - b.month : a.year - b.year));

export const isEqualOrAfter = (period: Period, subscription: Subscription): boolean => {
    const periodDate = moment({ year: period.year, month: period.month - 1 }); // month es 0-indexado en moment
    const expenseDate = moment(subscription.firstPaymentDate, 'YYYY-MM-DD');

    return periodDate.isSameOrAfter(expenseDate);
};
