import { useEffect, useState } from 'react';
import { Period, PeriodObj } from '../types/interfaces';
import { getPeriodName, isEqualOrAfter, parseToList, sortByPeriod } from '../helpers';
import { ExpenseTypeEnum, PaymentStatusEnum, PeriodStatusEnum } from '../types/enums';
import { Payment } from '../../store/interfaces';
import { useWallet } from './useWallet';

export const usePayments = () => {
    const [periods, setPeriods] = useState<Period[]>([]);
    const { payments, subscriptions } = useWallet();

    const addSimulatedPayments = (periodsObj: PeriodObj): Period[] => {
        return parseToList(periodsObj).map((period) => {
            const subs = subscriptions.filter((s) => isEqualOrAfter(period, s));
            const payments = period.payments;
            subs.forEach((s) => {
                if (!payments.some((pay) => pay.expenseId === s.id)) {
                    payments.push({
                        id: 0,
                        amount: s.amount,
                        creditCardId: s.creditCardId,
                        status: PaymentStatusEnum.SIMULATED,
                        expenseTitle: s.title,
                        expenseCcName: s.ccName,
                        expenseType: ExpenseTypeEnum.SUBSCRIPTION,
                        expenseId: s.id,
                        noInstallment: 0,
                        month: period.month,
                        year: period.year,
                    });
                }
            });
            return {
                ...period,
                totalSimulated: calcSimulatedTotal(payments),
                payments,
            };
        });
    };

    const calcSimulatedTotal = (payments: Payment[]): number => {
        return payments.reduce((acc, p) => (p.status === PaymentStatusEnum.SIMULATED ? acc + p.amount : acc), 0);
    };

    const pendingPeriods = (): Period[] => {
        return periods.filter((p) => p.status !== PeriodStatusEnum.PAID);
    };

    useEffect(() => {
        const periodsObj: PeriodObj = {};
        sortByPeriod(payments).forEach((p) => {
            const periodName = getPeriodName(p);
            if (!periodsObj[periodName]) periodsObj[periodName] = [];
            periodsObj[periodName].push(p);
        });
        setPeriods(addSimulatedPayments(periodsObj));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payments]);
    return {
        periods,
        pending: pendingPeriods(),
    };
};
