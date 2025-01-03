import { ExpenseTypeEnum, Payment } from '../../types';
import { useWallet } from '../../hooks';
import { StyledTableCell, StyledTableRow } from '../shared';
import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { formatCurrency, parseDateToString } from '../../helpers';
import { Delete, Edit, Visibility } from '@mui/icons-material';

interface Props {
    payment: Payment;
}

export const PaymentTableRow = ({ payment }: Props) => {
    const { getCreditCardById, getExpenseById } = useWallet();
    const expense = getExpenseById(payment.expenseId);
    const creditCard = getCreditCardById(expense?.accountId || 0);
    const acquiredAt = expense?.type === ExpenseTypeEnum.PURCHASE ? parseDateToString(expense.acquiredAt) : '---';
    const installment = expense?.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
    return (
        <>
            <StyledTableRow>
                <Tooltip title={expense?.ccName} placement='left'>
                    <StyledTableCell component='th' scope='row'>
                        {expense?.title}
                    </StyledTableCell>
                </Tooltip>
                <StyledTableCell align='right'>{creditCard?.alias || '?'}</StyledTableCell>

                <StyledTableCell align='right'>{formatCurrency(payment.amount)}</StyledTableCell>
                <StyledTableCell align='right'>{acquiredAt}</StyledTableCell>
                <StyledTableCell align='right'>{installment}</StyledTableCell>
                <StyledTableCell align='right'>
                    {payment.status}
                </StyledTableCell>
                <StyledTableCell align='right'>
                    <ButtonGroup size='small' aria-label='Small button group'>
                        <Button color='info'>
                            <Visibility />
                        </Button>
                        <Button color='warning' >
                            <Edit />
                        </Button>
                        <Button color='error' >
                            <Delete />
                        </Button>
                    </ButtonGroup>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
};


