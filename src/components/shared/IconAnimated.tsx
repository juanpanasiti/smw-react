import { Box, IconButton, SvgIconTypeMap } from '@mui/material';

import { OverridableComponent } from '@mui/material/OverridableComponent';

type MuiIcon = OverridableComponent<SvgIconTypeMap> & { muiName: string };
interface Props {
    value: boolean;
    handleClick?: () => void;
    FirstIcon: MuiIcon;
    SecondIcon: MuiIcon;
}
export const IconAnimated = ({ value, handleClick, FirstIcon, SecondIcon }: Props) => {
    return (
        <IconButton aria-label='delete' size='large' onClick={() => handleClick && handleClick()}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.5s ease-in-out',
                    transform: value ? 'rotate(0deg)' : 'rotate(360deg)',
                }}
            >
                {value ? <FirstIcon fontSize='inherit' /> : <SecondIcon fontSize='inherit' />}
            </Box>
        </IconButton>
    );
};
