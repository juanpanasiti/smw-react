import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { Delete, Edit, Visibility } from '@mui/icons-material';

import { ExpenseTypeEnum, FullPayment } from '../../types';
import { useWallet } from '../../hooks';
import { StyledTableCell, StyledTableRow } from '../shared';
import { formatCurrency, parseDateToString } from '../../helpers';

interface Props {
    payment: FullPayment;
}

export const PaymentTableRow = ({ payment }: Props) => {
    const { getExpenseById } = useWallet();
    const expense = getExpenseById(payment.expenseId);
    const acquiredAt = expense?.type === ExpenseTypeEnum.PURCHASE ? parseDateToString(expense.acquiredAt) : '---';
    const installment = expense?.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
    return (
        <>
            <StyledTableRow>
                <Tooltip title={payment.expenseCcName} placement='left'>
                    <StyledTableCell component='th' scope='row'>
                        {payment.expenseTitle}
                    </StyledTableCell>
                </Tooltip>
                <StyledTableCell align='right'>{payment.creditCardAlias}</StyledTableCell>

                <StyledTableCell align='right'>{formatCurrency(payment.amount)}</StyledTableCell>
                <StyledTableCell align='right'>{acquiredAt}</StyledTableCell>
                <StyledTableCell align='right'>{installment}</StyledTableCell>
                <StyledTableCell align='right'>{payment.status}</StyledTableCell>
                <StyledTableCell align='right'>
                    <ButtonGroup size='small' aria-label='Small button group'>
                        <Button color='info'>
                            <Visibility />
                        </Button>
                        <Button color='warning'>
                            <Edit />
                        </Button>
                        <Button color='error'>
                            <Delete />
                        </Button>
                    </ButtonGroup>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
};
