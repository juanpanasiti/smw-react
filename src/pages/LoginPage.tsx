import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router';

import { useForm } from '../hooks';
import { LoginForm } from '../types';
import { useAuth } from '../hooks/useAuth';

export const LoginPage = () => {
    const { values, handleChange, reset } = useForm<LoginForm>({ username: '', password: '' });
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(values);
    };

    return (
        <Box
            component='form'
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 400,
                mx: 'auto',
                mt: 5,
                p: 3,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <Typography variant='h4' gutterBottom>
                Iniciar Sesión
            </Typography>
            <TextField
                fullWidth
                label='Username'
                type='username'
                value={values.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
                margin='normal'
                required
            />
            <TextField
                fullWidth
                label='Contraseña'
                type='password'
                value={values.password || ''}
                onChange={(e) => handleChange('password', e.target.value)}
                margin='normal'
                required
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button type='submit' variant='contained' color='primary'>
                    Iniciar Sesión
                </Button>
                <Button type='button' variant='outlined' color='secondary' onClick={reset}>
                    Limpiar
                </Button>
            </Box>
            <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
                ¿No tienes cuenta?{' '}
                <Link to='/auth/register' style={{ textDecoration: 'none', color: '#007566' }}>
                    Haz click aquí
                </Link>
            </Typography>
        </Box>
    );
};
