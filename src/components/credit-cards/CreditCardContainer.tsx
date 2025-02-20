import { Card, SxProps, Theme } from '@mui/material';

interface Props {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}
export const CreditCardContainer = ({ children, sx = {} }: Props) => {
    return <Card sx={{ width: '350px', display: 'flex', flexDirection: 'column', ...sx }}>{children}</Card>;
};
