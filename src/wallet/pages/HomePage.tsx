import { Container, Grid, Paper, Typography } from '@mui/material';

import { CardsUsageChart, CardUsageByPeriodChart, PendingPeriodsChart } from '../components/charts';

export const HomePage = () => {
    return (
        <>
            <Container>
                <Grid container spacing={3}>
                    {/* Primera fila: 1 elemento */}
                    <Grid item xs={12} sx={{ minHeight: 400 }}>
                        <PendingPeriodsChart />
                    </Grid>

                    {/* Segunda fila: 2 elementos */}
                    <Grid item xs={6} sx={{ eight: 300 }}>
                        <CardsUsageChart />
                    </Grid>
                    <Grid item xs={6}>
                        <Paper>
                            <CardUsageByPeriodChart />
                        </Paper>
                    </Grid>

                    {/* Tercera fila: 3 elementos */}
                    <Grid item xs={4}>
                        <Paper>
                            <Typography variant='h6' align='center'>
                                Elemento 4
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography variant='h6' align='center'>
                                Elemento 5
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper>
                            <Typography variant='h6' align='center'>
                                Elemento 6
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
