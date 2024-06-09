import { Alert, AlertTitle, Grid, Typography } from '@mui/material';

import { useWallet } from '../../hooks';
import { CreditCardCard, CreditCardModal } from '../components/credit-cards';
import { Fab } from '../components/commons';
import { AddCard } from '@mui/icons-material';
import { useModal } from '../hooks';

export const CreditsCardsPage = () => {
    const { creditCards } = useWallet();
    const { open, handleOpen } = useModal();
    return (
        <>
            <Typography variant='h2'>Credit Cards</Typography>
            {creditCards?.length === 0 && (
                <Alert severity='info'>
                    <AlertTitle>Nothing to show</AlertTitle>
                    There are no credit cards to show, but you can{' '}
                    <b>
                        <a onClick={() => console.log('not impl')}>add a new one</a>
                    </b>
                    .
                </Alert>
            )}
            <Grid container spacing={2}>
                {creditCards?.map((creditCard) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={creditCard.id}>
                        <CreditCardCard creditCard={creditCard} />
                    </Grid>
                ))}
            </Grid>

            <Fab handleClick={handleOpen} icon={<AddCard />} label='' color='primary' />
            <CreditCardModal open={open} handleOpen={() => handleOpen()} />
        </>
    );
};
