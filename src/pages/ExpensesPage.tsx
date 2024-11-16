import { Typography } from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';

import { useModal } from '../hooks';
import { ExpenseModalForm, ExpenseTable } from '../components/expenses';
import { Fab } from '../components/common';

export const ExpensesPage = () => {
    const { open, handleOpen } = useModal();

    return (
        <>
            <Typography variant='h2'>Expenses</Typography>

            <ExpenseTable />

            <Fab handleClick={handleOpen} icon={<ReceiptLong />} color='primary' />
            <ExpenseModalForm open={open} handleOpen={() => handleOpen()} />
        </>
    );
};
