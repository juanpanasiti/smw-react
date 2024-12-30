import { Divider, Typography } from '@mui/material';

import { CreditCardList } from '../components/credit-cards';
import { ExpenseList } from '../components/expenses';
import { useWallet } from '../hooks';

export const ExpensesPage = () => {
    const { creditCards } = useWallet();
    return (
        <>
            <Typography variant='h1'>Gastos</Typography>
            <Divider sx={{ marginY: 3 }} />
            <CreditCardList cards={creditCards} />
            <Divider sx={{ marginY: 3 }} />
            <ExpenseList />
        </>
    );
};
