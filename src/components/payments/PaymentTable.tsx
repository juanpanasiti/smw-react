import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { PaymentTableRow } from './PaymentTableRow';
import { Payment } from '../../types';


interface Props {
    payments: Payment[];
    hideTitle?: boolean;
    hidePeriod?: boolean;
}
export const PaymentTable = ({ payments, hideTitle = false, hidePeriod = true }: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {!hideTitle && <TableCell>Title</TableCell>}
                        <TableCell>Amount</TableCell>
                        {!hidePeriod && <TableCell>Period</TableCell>}
                        <TableCell>Installment</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((payment) => (
                        <PaymentTableRow key={`${payment.expenseId}-${payment.id}`} payment={payment} hideTitle={hideTitle} hidePeriod={hidePeriod} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
