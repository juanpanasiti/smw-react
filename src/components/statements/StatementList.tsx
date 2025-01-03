import { Collapse, Typography } from '@mui/material';

import { Period } from '../../types';
import { StatementItem } from './StatementItem';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
    periods: Period[];
    title: string;
    collapse: boolean;
    handleVisibility: () => void;
}
export const StatementList = ({ periods, title, collapse, handleVisibility }: Props) => {
    const [periodSelected, setPeriodSelected] = useState<string>('');
    const handleChange = (panel: string) => (e: React.SyntheticEvent, isExpanded: boolean) => {
        setPeriodSelected(isExpanded ? panel : '');
    };

    return (
        <>
            <Typography variant='h3'>
                {title} <span onClick={handleVisibility}>{collapse ? <VisibilityOff /> : <Visibility />}</span>
            </Typography>
            <Collapse in={collapse}>
                {periods.map((period: Period) => (
                    <StatementItem key={period.id} period={period} expanded={periodSelected === period.id} handleChange={handleChange} />
                ))}
            </Collapse>
        </>
    );
};
