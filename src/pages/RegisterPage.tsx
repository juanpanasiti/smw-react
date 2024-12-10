import { TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router';

import { useForm } from '../hooks/useForm';
import { RegisterForm } from '../types';
import { useAuth } from '../hooks/useAuth';

export const RegisterPage = () => {
    const { values, handleChange, reset } = useForm<RegisterForm>({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
    });
    const { register } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        register(values);
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
                Crear cuenta
            </Typography>
            <TextField
                fullWidth
                label='Nombre de usuario'
                type='text'
                value={values.username || ''}
                onChange={(e) => handleChange('username', e.target.value)}
                margin='normal'
                required
            />
            <TextField
                fullWidth
                label='Correo electrónico'
                type='email'
                value={values.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                margin='normal'
                required
            />
            <TextField
                fullWidth
                label='Nombre'
                type='text'
                value={values.first_name || ''}
                onChange={(e) => handleChange('first_name', e.target.value)}
                margin='normal'
                required
            />
            <TextField
                fullWidth
                label='Apellido'
                type='text'
                value={values.last_name || ''}
                onChange={(e) => handleChange('last_name', e.target.value)}
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
                    Registrarse
                </Button>
                <Button type='button' variant='outlined' color='secondary' onClick={reset}>
                    Limpiar
                </Button>
            </Box>
            <Typography variant='body2' sx={{ mt: 3, textAlign: 'center' }}>
                ¿Ya tienes una cuenta?{' '}
                <Link to='/auth/login' style={{ textDecoration: 'none', color: '#007566' }}>
                    Inicia sesión aquí
                </Link>
            </Typography>
        </Box>
    );
};
