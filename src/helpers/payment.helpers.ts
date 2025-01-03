import { Expense, FINISHED_PAYMENT_STATUSES, Payment, Period, PeriodDictionary, PeriodStatusEnum } from '../types';

export const getPeriods = (expenses: Expense[]): Period[] => {
    const periodsDict: PeriodDictionary = {};
    const allPayments: Payment[] = expenses.flatMap((expense) => expense.payments);
    allPayments.forEach((payment) => {
        const periodId = `${payment.year}-${payment.month}`;
        if (!periodsDict[periodId]) {
            periodsDict[periodId] = {
                id: periodId,
                month: payment.month,
                year: payment.year,
                status: PeriodStatusEnum.DONE,
                payments: [],
            };
        }
        periodsDict[periodId].payments.push(payment);
        if (!FINISHED_PAYMENT_STATUSES.includes(payment.status)) {
            periodsDict[periodId].status = PeriodStatusEnum.PENDING;
        }
    });
    return Object.values(periodsDict);
};

export const sortPeriods = (periods: Period[]): Period[] => {
    return periods.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        return a.month - b.month;
    });
};
