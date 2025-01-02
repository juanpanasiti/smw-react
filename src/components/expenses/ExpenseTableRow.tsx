import { useState } from 'react';

import { Delete, Edit, EventRepeat, ShoppingBag, Visibility } from '@mui/icons-material';
import { Button, ButtonGroup, TableCell, tableCellClasses, TableRow, Tooltip } from '@mui/material';
import { styled } from 'styled-components';
import { enqueueSnackbar } from 'notistack';

import { Expense, ExpenseTypeEnum } from '../../types';
import { formatCurrency, parseDateToString } from '../../helpers';
import { useWallet } from '../../hooks';
import { AgreeActionDialog } from '../shared';

interface Props {
    expense: Expense;
    handleEdit: () => void;
}
export const ExpenseTableRow = ({ expense, handleEdit }: Props) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { getCreditCardById, deleteExpense } = useWallet();

    const handleDelete = () => {
        try {
            deleteExpense(expense.id);
            enqueueSnackbar('Gasto borrado', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error al borrar el gasto', { variant: 'error' });
        }
    };

    const onDeleteClick = () => {
        setShowDeleteDialog(true);
    };
    return (
        <>
            <StyledTableRow key={expense.id}>
                <Tooltip title={expense.ccName} placement='left'>
                    <StyledTableCell component='th' scope='row'>
                        {expense.title}
                    </StyledTableCell>
                </Tooltip>
                <StyledTableCell align='right'>{getCreditCardById(expense.accountId)?.alias || '?'}</StyledTableCell>
                <Tooltip title={expense.type} placement='right'>
                    <StyledTableCell align='right'>{expense.type === ExpenseTypeEnum.PURCHASE ? <ShoppingBag /> : <EventRepeat />}</StyledTableCell>
                </Tooltip>
                <StyledTableCell align='right'>{formatCurrency(expense.amount)}</StyledTableCell>
                <StyledTableCell align='right'>{parseDateToString(expense.acquiredAt)}</StyledTableCell>
                <StyledTableCell align='right'>
                    {expense.type === ExpenseTypeEnum.PURCHASE ? `${expense.installmentsPaid}/${expense.installments}` : '---'}
                </StyledTableCell>
                <StyledTableCell align='right'>
                    {expense.type === ExpenseTypeEnum.PURCHASE ? `${Math.round(expense.totalPaid / expense.amount) * 100}%` : '---'}
                </StyledTableCell>
                <StyledTableCell align='right'>
                    <ButtonGroup size='small' aria-label='Small button group'>
                        <Button color='info'>
                            <Visibility />
                        </Button>
                        <Button color='warning' onClick={handleEdit}>
                            <Edit />
                        </Button>
                        <Button color='error' onClick={onDeleteClick}>
                            <Delete />
                        </Button>
                    </ButtonGroup>
                </StyledTableCell>
            </StyledTableRow>
            {showDeleteDialog && (
                <AgreeActionDialog
                    open={showDeleteDialog}
                    title={`Confirma borrar el gasto "${expense.title}" de ${formatCurrency(expense.amount)}?`}
                    handleAgree={handleDelete}
                    handleClose={() => setShowDeleteDialog(false)}
                    description='Esta acción no se puede deshacer y burrará todos los gastos y pagos asociados a la tarjeta.'
                />
            )}
        </>
    );
};

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

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#000',
        color: '#FFF',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
