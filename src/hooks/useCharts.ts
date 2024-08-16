import { pickColor } from '../helpers';
import { CreditCardChart, PeriodChart, PeriodStatusEnum, SimplePeriodChart } from '../types';
import { useWallet } from './useWallet';

export const useCharts = () => {
    const { simpleCreditCards, periods } = useWallet();
    const pending = periods.filter((period) => period.status === PeriodStatusEnum.PENDING);

    const parsePendingPeriods = (): PeriodChart[] => {
        return pending.map((period) => {
            return {
                key: period.id,
                total: period.total.toFixed(2),
                totalEstimated: period.totalSimulated.toFixed(2),
            };
        });
    };
    const parseCreditCard = (): CreditCardChart[] => {
        return simpleCreditCards.map((cc, index) => {
            return {
                key: cc.alias,
                total: cc.totalSpent || 0,
                color: pickColor(index),
            };
        });
    };
    const parsePeriods = (): SimplePeriodChart[] => {
        const periodList: SimplePeriodChart[] = [];
        periods
            .filter((p) => p.status === PeriodStatusEnum.PENDING)
            .forEach((p) => {
                const simplePeriodChart: SimplePeriodChart = {
                    key: p.id,
                    payments: [],
                };
                p.payments.forEach((payment, index) => {
                    simplePeriodChart.payments.push({
                        key: payment.expenseCcName,
                        total: payment.amount,
                        color: pickColor(index),
                    });
                });
                periodList.push(simplePeriodChart);
            });
        return periodList;
    };
    return {
        pending: parsePendingPeriods(),
        creditCards: parseCreditCard(),
        paymentsByPeriod: parsePeriods(),
    };
};
