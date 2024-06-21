import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useCharts } from '../../hooks';
import { Typography } from '@mui/material';

export const CardsUsageChart = () => {
    const { creditCards } = useCharts();

    return (
        <>
            <Typography variant='h6'>Spent By Credit Card</Typography>
            <ResponsiveContainer width='100%' height={400}>
                <PieChart>
                    <Pie data={creditCards} dataKey='total' nameKey='key'>
                        {creditCards.map(({ key, color }) => (
                            <Cell key={key} fill={color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$ ${Number(value).toFixed(2)}`} />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};
