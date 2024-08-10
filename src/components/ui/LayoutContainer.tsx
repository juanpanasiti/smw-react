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
