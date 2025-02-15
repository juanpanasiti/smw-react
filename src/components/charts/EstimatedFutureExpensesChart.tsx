import { useEffect, useState } from 'react';


import Chart from 'react-apexcharts';

import { ChartState, PeriodStatusEnum } from '../../types';
import { useWalletStore } from '../../store/wallet';
import { getChartDefaultState, getChartStateFromPeriods, getFullPayment, getPeriodFullList, sortPeriods } from '../../helpers';


export const EstimatedFutureExpensesChart = () => {
    const { creditCards, expenses } = useWalletStore();
    const [state, setState] = useState<ChartState>(getChartDefaultState());


    useEffect(() => {
        const fullPaymentList = expenses.flatMap((expense) => expense.payments.map((payment) => getFullPayment(payment, expenses, creditCards)));
        const periodFullList = sortPeriods(getPeriodFullList(fullPaymentList));
        const pendingOnes = periodFullList.filter((period) => period.status === PeriodStatusEnum.PENDING);
        setState(getChartStateFromPeriods(pendingOnes))

    }, [expenses, creditCards]);
    

    return (
        <div>
            <div id='chart'>
                <Chart options={state?.options} series={state?.series} type='area' height={400} />
            </div>
            <div id='html-dist'></div>
        </div>
    );
};
