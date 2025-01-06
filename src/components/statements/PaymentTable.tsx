import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';

import { StyledTableCell } from '../shared';
import { PaymentTableRow } from './PaymentTableRow';
import { FullPayment } from '../../types';

interface Props {
    payments: FullPayment[];
}

export const PaymentTable = ({ payments }: Props) => {
    return (
        <>
            {/* TODO: filter form */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Título</StyledTableCell>
                            <StyledTableCell align='right'>T. Crédito</StyledTableCell>
                            <StyledTableCell align='right'>Monto</StyledTableCell>
                            <StyledTableCell align='right'>F. Compra/Adquirido</StyledTableCell>
                            <StyledTableCell align='right'>Cuota</StyledTableCell>
                            <StyledTableCell align='right'>Estado</StyledTableCell>
                            <StyledTableCell align='right'>Opciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <PaymentTableRow key={payment.id} payment={payment} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
