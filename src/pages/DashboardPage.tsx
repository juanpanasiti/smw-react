import { Alert, AlertTitle, Container, Grid, Typography } from '@mui/material';
import { AddCard } from '@mui/icons-material';

import { useModal, useWallet } from '../hooks';
import { Fab } from '../components/common';
import { CreditCardCard, CreditCardModal } from '../components/credit-cards';
import { PendingPeriodsChart } from '../components/charts';

export const DashboardPage = () => {
    const {
        // walletData,
        creditCards,
        // mainCreditCards,
        // simpleCreditCards,
        // purchases,
        // subscriptions,
        // paymentFullList,
        // paymentPendingList,
        // paymentDoneList,
        // periods,
    } = useWallet();
    const { open, handleOpen } = useModal();
    return (
        <Container>
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
            {/* <pre>
                {JSON.stringify(
                    {
                        walletData: walletData?.length || 'undefined',
                        creditCards: creditCards.length,
                        mainCreditCards: mainCreditCards.length,
                        simpleCreditCards: simpleCreditCards.length,
                        purchases: purchases.length,
                        subscriptions: subscriptions.length,
                        paymentFullList: paymentFullList.length,
                        paymentPendingList: paymentPendingList.length,
                        paymentDoneList: paymentDoneList.length,
                        periods: periods.length,
                    },
                    null,
                    2
                )}
            </pre> */}

            <hr />

            <Typography variant='h2'>Prediction</Typography>
            <Grid container spacing={3}>
                {/* Primera fila: 1 elemento */}
                <Grid item xs={12} sx={{ minHeight: 400 }}>
                    <PendingPeriodsChart />
                </Grid>
            </Grid>
        </Container>
    );
};
