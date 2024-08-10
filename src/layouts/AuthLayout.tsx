import { Box, Card, CardContent } from '@mui/material';
import { LayoutContainer } from '../components/ui';

interface Props {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <LayoutContainer containterStyle={{ justifyContent: 'center', alignItems: 'center' }}>
            <Card
                sx={{
                    minWidth: 500,
                    minHeight: 300,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardContent>
                    <Box>{children}</Box>
                </CardContent>
            </Card>
        </LayoutContainer>
    );
};
