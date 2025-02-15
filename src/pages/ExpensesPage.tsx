import { Divider, Typography } from '@mui/material';
import styled from 'styled-components';

import { CreditCardList } from '../components/credit-cards';
import { ExpenseList } from '../components/expenses';
import { useWalletStore } from '../store/wallet';

export const ExpensesPage = () => {
    const { creditCards, expenses } = useWalletStore();
    return (
        <ContainerFake>
            <Typography variant='h1'>Gastos</Typography>
            <Divider sx={{ marginY: 3 }} />
            <CreditCardList cards={creditCards} />
            <Divider sx={{ marginY: 3 }} />
            <ExpenseList expenses={expenses} />
        </ContainerFake>
    );
};

const ContainerFake = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;
