import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente opcional
                zIndex: 1300, // Encima de otros elementos (mismo zIndex que los modales)
            }}
        >
            <CircularProgress color='primary' size={60} />
        </Box>
    );
};
