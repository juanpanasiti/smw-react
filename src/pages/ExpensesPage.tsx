import { Divider, Typography } from '@mui/material';

import { CreditCardList } from '../components/credit-cards';
import { ExpenseList } from '../components/expenses';
import { useWalletStore } from '../store/wallet';
import { FlexContainerColumn } from '../components/shared';

export const ExpensesPage = () => {
    const { getMainCreditCards, expenses } = useWalletStore();
    const creditCards = getMainCreditCards();

    return (
        <FlexContainerColumn>
            <Typography variant='h1'>Gastos</Typography>
            <Divider sx={{ marginY: 3 }} />
            <CreditCardList cards={creditCards} show={false} />
            <Divider sx={{ marginY: 3 }} />
            <ExpenseList expenses={expenses} />
        </FlexContainerColumn>
    );
};
