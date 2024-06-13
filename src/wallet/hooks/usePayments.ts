import { useEffect, useState } from 'react';
import { useWallet } from '../../hooks';
import { Period, PeriodObj } from '../types/interfaces';
import { getPeriodName, parseToList, sortByPeriod } from '../helpers';

export const usePayments = () => {
    const [periods, setPeriods] = useState<Period[]>([]);
    const { payments } = useWallet();

    useEffect(() => {
        const periodsObj: PeriodObj = {};
        sortByPeriod(payments).forEach((p) => {
            const periodName = getPeriodName(p);
            if (!periodsObj[periodName]) periodsObj[periodName] = [];
            periodsObj[periodName].push(p);
        });
        setPeriods(parseToList(periodsObj));
    }, [payments]);
    return {
        periods,
    };
};
