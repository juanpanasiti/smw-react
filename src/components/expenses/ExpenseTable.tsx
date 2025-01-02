import { useState } from 'react';

import {Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from 'styled-components';

import { Expense } from '../../types';
import { ExpenseModalForm } from './ExpenseModalForm';
import { ExpenseTableRow } from './ExpenseTableRow';

interface Props {
    expenses: Expense[];
}
export const ExpenseTable = ({ expenses }: Props) => {
    const [expenseSelected, setExpenseSelected] = useState<Expense | null>(null);
    

    
    return (
        <>
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
                            <StyledTableCell align='right'>Opciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense) => (
                            <ExpenseTableRow key={expense.id} expense={expense} handleEdit={() => setExpenseSelected(expense)}  />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {expenseSelected && (
                <ExpenseModalForm
                    open={!!expenseSelected}
                    handleClose={() => setExpenseSelected(null)}
                    expense={expenseSelected}
                    expenseId={expenseSelected.id}
                />
            )}
            
        </>
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


