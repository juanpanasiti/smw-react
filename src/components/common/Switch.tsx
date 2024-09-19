import { Stack, Typography, Switch as MuiSwitch } from '@mui/material';

interface Props {
    leftLabel: string;
    rightLabel: string;
    handleToggle: () => void;
}
export const Switch = ({leftLabel, rightLabel, handleToggle}: Props) => {
    return (
        <Stack direction='row' spacing={1} alignItems='center'>
            <Typography>{leftLabel}</Typography>
            <MuiSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onChange={handleToggle} />
            <Typography>{rightLabel}</Typography>
        </Stack>
    );
};
