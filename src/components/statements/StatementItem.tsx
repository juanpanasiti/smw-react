import { useState } from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ArrowDownward } from '@mui/icons-material';

import { FINISHED_PAYMENT_STATUSES, FullPayment, Period } from '../../types';
import { formatCurrency } from '../../helpers';
import { PaymentTable } from './PaymentTable';
import { useFilter, usePagination } from '../../hooks';
import { PaymentSearchForm } from './forms';
import { NoContentMessage } from '../shared';
import PaginationNav from '../shared/PaginationNav';

interface Props {
    period: Period;
    expanded: boolean;
    handleChange: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export const StatementItem = ({ period, expanded, handleChange }: Props) => {
    const [pageLimit, setPageLimit] = useState(10);
    const { filteredList, filter, setFilter } = useFilter<FullPayment>(period.payments);
    const { currentPage, currentPageNumber, totalPages, goPage } = usePagination(filteredList, pageLimit);

    let totalPaid: number = 0;
    let totalAmount: number = 0;
    period.payments.forEach((payment) => {
        totalPaid += FINISHED_PAYMENT_STATUSES.includes(payment.status) ? payment.amount : 0;
        totalAmount += payment.amount;
    });
    return (
        <Accordion slotProps={{ transition: { unmountOnExit: true, mountOnEnter: false } }} expanded={expanded} onChange={handleChange(period.id)}>
            <AccordionSummary expandIcon={<ArrowDownward />} aria-controls='panel1bh-content' id='panel1bh-header'>
                <Typography component='span' sx={{ width: '33%', flexShrink: 0 }}>
                    {period.month}-{period.year}
                </Typography>
                <Typography component='span' sx={{ color: 'text.secondary' }}>
                    Monto confirmado {formatCurrency(totalPaid)} / {formatCurrency(totalAmount)} ({Math.round((totalPaid / totalAmount) * 100)}%)
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <PaymentSearchForm searchFilter={filter} setSearchFilter={setFilter} pageLimit={pageLimit} setPageLimit={setPageLimit} />
                {currentPage && currentPage.length !== 0 && <PaymentTable payments={currentPage} />}
                {(!currentPage || currentPage.length === 0) && <NoContentMessage />}
                <PaginationNav totalPages={totalPages} currentPage={currentPageNumber} handlePageChange={goPage} />
            </AccordionDetails>
        </Accordion>
    );
};
