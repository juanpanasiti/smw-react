import { Box, Card, CardContent } from '@mui/material';


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


//! MOVE
import { Container, SxProps, Theme } from '@mui/material';

interface Props {
    children: React.ReactNode;
    containterStyle?: SxProps<Theme> | undefined
}

export const LayoutContainer = ({ children, containterStyle }: Props) => {
    return (
        <Container
            maxWidth='lg'
            sx={{
                height: '100vh',
                display: 'flex',
                ...containterStyle
            }}
        >
            {children}
        </Container>
    );
};