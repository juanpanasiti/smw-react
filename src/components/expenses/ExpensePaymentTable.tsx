import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';

import { StyledTableCell } from '../shared';
import { Expense, FullPayment } from '../../types';
import { ExpensePaymentTableRow } from './ExpensePaymentTableRow';

interface Props {
    payments: FullPayment[];
    expense: Expense
}

export const ExpensePaymentTable = ({ payments, expense }: Props) => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <TableContainer
                component={Paper}
                sx={{
                    maxHeight: 400,
                    overflowY: 'auto',
                    bgcolor: theme.palette.background.paper,
                    '::-webkit-scrollbar': {
                        width: 8, // Ancho de la barra de scroll
                    },
                    '::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.action.active, // Color del thumb
                        borderRadius: 4,
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: theme.palette.action.hover, // Color en hover
                    },
                    '::-webkit-scrollbar-track': {
                        backgroundColor: theme.palette.background.default, // Fondo del scrollbar
                        borderRadius: 4,
                    },
                }}
            >
                <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">Monto</StyledTableCell>
                            <StyledTableCell align="right">Cuota</StyledTableCell>
                            <StyledTableCell align="right">Mes</StyledTableCell>
                            <StyledTableCell align="right">Estado</StyledTableCell>
                            <StyledTableCell align="right">Opciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((payment) => (
                            <ExpensePaymentTableRow key={payment.id} payment={payment} expense={expense} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
