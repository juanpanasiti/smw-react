import { useState } from 'react';

import { Box } from '@mui/material';

import { Period } from '../../types';
import { PeriodAccordition } from './PeriodAccordition';

interface Props {
    periods: Period[];
}
export const PeriodList = ({ periods }: Props) => {
    const [selectedPanel, setSelectedPanel] = useState<string | null>(null);
    const handleChange = (panelName: string) => {
        setSelectedPanel(panelName === selectedPanel ? null : panelName);
    };
    return (
        <Box sx={{ p: 2 }}>
            {periods.map((period) => (
                <PeriodAccordition key={period.id} handleChange={handleChange} period={period} selectedPanel={selectedPanel} />
            ))}
        </Box>
    );
};
