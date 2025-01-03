import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { FINISHED_PAYMENT_STATUSES, Period } from '../../types';
import { ArrowDownward } from '@mui/icons-material';
import { formatCurrency } from '../../helpers';
import { PaymentTable } from './PaymentTable';

interface Props {
    period: Period;
    expanded: boolean;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const StatementItem = ({ period, expanded, handleChange }: Props) => {
    let totalPaid: number = 0;
    let totalAmount: number = 0;
    period.payments.forEach((payment) => {
        totalPaid += FINISHED_PAYMENT_STATUSES.includes(payment.status) ? payment.amount : 0;
        totalAmount += payment.amount;
    });
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true , mountOnEnter: false} }} expanded={expanded} onChange={handleChange(period.id)}>
            <AccordionSummary expandIcon={<ArrowDownward />} aria-controls='panel1bh-content' id='panel1bh-header'>
                <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
                    {period.month}-{period.year}
                </Typography>
                <Typography component='span' sx={{ color: 'text.secondary' }}>
                    Monto confirmado {formatCurrency(totalPaid)} / {formatCurrency(totalAmount)} ({Math.round((totalPaid / totalAmount) * 100)}%)
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <PaymentTable payments={period.payments} />
            </AccordionDetails>
        </Accordion>
    );
};
