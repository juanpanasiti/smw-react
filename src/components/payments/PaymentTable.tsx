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
                <TableHead style={{backgroundColor:'black'}}>
                    <TableRow>
                        <TableCell style={{fontWeight:'bold'}}>Acquired At</TableCell>
                        {!hideTitle && <TableCell style={{fontWeight:'bold'}}>Title</TableCell>}
                        <TableCell style={{fontWeight:'bold'}}>Amount</TableCell>
                        {!hidePeriod && <TableCell style={{fontWeight:'bold'}}>Period</TableCell>}
                        <TableCell style={{fontWeight:'bold'}}>Installment</TableCell>
                        <TableCell style={{fontWeight:'bold'}}>Status</TableCell>
                        <TableCell style={{fontWeight:'bold'}}>Actions</TableCell>
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
