import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { useCharts } from '../../hooks';
import { Typography } from '@mui/material';

export const PendingPeriodsChart = () => {
    const { pending } = useCharts();
    return (
        <div>
            <Typography variant='h6'>Future Payments Monthly Amounts</Typography>
            <ResponsiveContainer width='100%' height={400}>
                <AreaChart
                    data={pending}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 10,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid stroke='#D3D3D355' strokeDasharray='5 5' />
                    <XAxis dataKey='key' />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: '#333333', fontWeight: 'bolder' }} />
                    <Area type='linearClosed' dataKey={() => 1000000} stackId='0' stroke='#993D38' />
                    <Area type='monotone' dataKey='total' stackId='1' stroke='#AA7F63' fill='#FFDAB9' />
                    <Area type='monotone' dataKey='totalEstimated' stackId='1' stroke='#6B9097' fill='#AEC6CF' />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
