import { useState } from 'react';
import { StatementList } from '../components/statements';
import { useWallet } from '../hooks';
import { PeriodStatusEnum } from '../types';
import { Divider } from '@mui/material';

export const StatementsPage = () => {
    const [showPendingOnes, setShowPendingOnes] = useState(true);
    const [showDoneOnes, setShowDoneOnes] = useState(false);

    const { periods } = useWallet();
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
            <Divider sx={{margin:'1rem 0'}}/>
            <StatementList periods={doneOnes} title='Pagados' handleVisibility={() => setShowDoneOnes(!showDoneOnes)} collapse={showDoneOnes} />
        </div>
    );
};
