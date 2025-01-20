import { useEffect, useState } from 'react';

import { Divider } from '@mui/material';

import { StatementList } from '../components/statements';
import { useWallet } from '../hooks';
import { Period, PeriodStatusEnum } from '../types';
import { getFullPayment, getPeriodFullList, sortPeriods } from '../helpers';

export const StatementsPage = () => {
    const [showPendingOnes, setShowPendingOnes] = useState(true);
    const [showDoneOnes, setShowDoneOnes] = useState(false);
    const { creditCards, expenses } = useWallet();
    const [periods, setperiods] = useState<Period[]>([]);

    useEffect(() => {
        const fullPaymentList = expenses.flatMap((expense) => expense.payments.map((payment) => getFullPayment(payment, expenses, creditCards)));
        const periodFullList = sortPeriods(getPeriodFullList(fullPaymentList));
        setperiods(periodFullList);
    }, [expenses, creditCards]);

    const doneOnes = periods.filter((period) => period.status === PeriodStatusEnum.DONE);
    const pendingOnes = periods.filter((period) => period.status === PeriodStatusEnum.PENDING);
    return (
        <div>
            <StatementList
                periods={pendingOnes}
                title='Pendientes'
                handleVisibility={() => setShowPendingOnes(!showPendingOnes)}
                collapse={showPendingOnes}
            />
            <Divider sx={{ margin: '1rem 0' }} />
            <StatementList periods={doneOnes} title='Pagados' handleVisibility={() => setShowDoneOnes(!showDoneOnes)} collapse={showDoneOnes} />
        </div>
    );
};
