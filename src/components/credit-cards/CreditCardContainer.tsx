import { Card } from '@mui/material';

interface Props {
    children: React.ReactNode;
}
export const CreditCardContainer = ({ children }: Props) => {
    return <Card sx={{ width: '350px', display: 'flex', flexDirection: 'column' }}>{children}</Card>;
};
