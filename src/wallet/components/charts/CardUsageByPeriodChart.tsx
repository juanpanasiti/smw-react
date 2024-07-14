import { Typography } from '@mui/material';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { useCharts } from '../../hooks';

export const CardUsageByPeriodChart = () => {
    const { paymentsByPeriod } = useCharts();
    return (
        <>
            <Typography variant='h6'>Spent By Period</Typography>
            {paymentsByPeriod && (
                <ResponsiveContainer width='100%' height={400}>
                    <PieChart>
                        <Pie data={paymentsByPeriod[0].payments} dataKey='total' nameKey='key'>
                            {paymentsByPeriod[0].payments.map(({ key, color }) => (
                                <Cell key={key} fill={color} />
                            ))}
                        </Pie>
                        {/* TODO: <Tooltip /> */}
                    </PieChart>
                </ResponsiveContainer>
            )}
        </>
    );
};
