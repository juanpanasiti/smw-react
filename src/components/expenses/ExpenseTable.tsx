import { Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import { styled } from 'styled-components';
import { Expense, ExpenseTypeEnum } from '../../types';
import { parseDateToString } from '../../helpers/date.helpers';
import { EventRepeat, ShoppingBag } from '@mui/icons-material';
import { useWallet } from '../../hooks';
import { formatCurrency } from '../../helpers';

interface Props {
    expenses: Expense[];
}
export const ExpenseTable = ({ expenses }: Props) => {
    const { getCreditCardById } = useWallet()
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Título</StyledTableCell>
                        <StyledTableCell align='right'>T. Crédito</StyledTableCell>
                        <StyledTableCell align='right'>Tipo</StyledTableCell>
                        <StyledTableCell align='right'>Monto</StyledTableCell>
                        <StyledTableCell align='right'>F. Compra</StyledTableCell>
                        <StyledTableCell align='right'>Cuotas</StyledTableCell>
                        <StyledTableCell align='right'>% Pagado</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense) => (
                        <StyledTableRow key={expense.id}>
                            <Tooltip title={expense.ccName} placement='left' >
                                <StyledTableCell component='th' scope='row'>
                                    {expense.title}
                                </StyledTableCell>
                            </Tooltip>
                            <StyledTableCell align='right'>{getCreditCardById(expense.accountId)?.alias || '?'}</StyledTableCell>
                            <Tooltip title={expense.type} placement='right'>
                                <StyledTableCell align='right'>
                                    {expense.type === ExpenseTypeEnum.PURCHASE ? <ShoppingBag /> : <EventRepeat />}
                                </StyledTableCell>
                            </Tooltip>
                            <StyledTableCell align='right'>{formatCurrency(expense.amount)}</StyledTableCell>
                            <StyledTableCell align='right'>{parseDateToString(expense.acquiredAt)}</StyledTableCell>
                            <StyledTableCell align='right'>
                            {expense.type === ExpenseTypeEnum.PURCHASE ? `${expense.installmentsPaid}/${expense.installments}` : '---'}
                                
                            </StyledTableCell>
                            <StyledTableCell align='right'>
                                {expense.type === ExpenseTypeEnum.PURCHASE ? `${Math.round(expense.totalPaid / expense.amount) * 100}%` : '---'}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#000',
        color: '#FFF',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(() => {
    return {
        '&:nth-of-type(odd)': {
            backgroundColor: '#222',
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    };
});
