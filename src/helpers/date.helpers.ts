import moment from 'moment';
import { Period } from '../types';

export const getCurrentDate = () => moment().format('YYYY-MM-DD');

export const calcPaymentDate = (acquiredAt: string, closingDate?: string): string => {
    const firstDate = moment(acquiredAt, 'YYYY-MM-DD');
    const secondDate = moment(closingDate, 'YYYY-MM-DD');

    if (firstDate.isBefore(secondDate || !closingDate)) {
        const res = secondDate.add(1, 'month').startOf('month').format('YYYY-MM-DD');
        return res;
    } else {
        const res = secondDate.add(2, 'month').startOf('month').format('YYYY-MM-DD');
        return res;
    }
};

export const getPeriodDate = (period: Period): string => `${period.year}-${period.month.toString().padStart(2,'0')}`