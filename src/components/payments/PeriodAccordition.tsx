import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';

import { PaymentTable } from './PaymentTable';
import { Period } from '../../types';
import { useFilterPayments, useWallet } from '../../hooks';
import { parseCurrency } from '../../helpers';
import { PaymentsFilterForm } from './PaymentsFilterForm';


interface Props {
    period: Period;
    handleChange: (periodName: string) => void;
    selectedPanel: string | null;
}

export const PeriodAccordition = ({ period, handleChange, selectedPanel }: Props) => {
    const { filteredPayments, ...restFilterData } = useFilterPayments({ originalPayments: period.payments });
    const { creditCards } = useWallet();

    return (
        <Accordion expanded={selectedPanel === period.id} onChange={() => handleChange(period.id)}>
            <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`${period.id}-bh-content`} id={`${period.id}-bh-header`}>
                <Typography sx={{ width: '75%', flexShrink: 0 }}>{period.id}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{parseCurrency(period.total)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <PaymentsFilterForm creditCards={creditCards} {...restFilterData} />
                <PaymentTable payments={filteredPayments} />
            </AccordionDetails>
        </Accordion>
    );
};
