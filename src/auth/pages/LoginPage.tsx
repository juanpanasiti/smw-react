import { Login } from '@mui/icons-material';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from 'react-hook-form';
import { LoginData } from '../interfaces';
import { useAuth } from '../hooks';

export const LoginPage = () => {
    const { register, handleSubmit, formState } = useForm<LoginData>();
    const { login } = useAuth();

    const onSubmit = (data: LoginData) => {
        login(data);
    };

    return (
        <AuthLayout title='Login'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {/* Fields */}
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField label='Username' type='text' placeholder='username' fullWidth {...register('username', { required: true })} />
                        {formState.errors.username && <span>Something is wrong with your username</span>}
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                        <TextField label='Password' type='password' placeholder='******' fullWidth {...register('password', { required: true })} />
                        {formState.errors.password && <span>This field is required</span>}
                    </Grid>
                    {/* Buttons */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12}>
                            <Button type='submit' variant='contained' fullWidth>
                                <Login />
                                <Typography sx={{ ml: 1 }}>Login</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    {/* Register Link */}
                    <Grid container direction='row'>
                        <Grid item xs={12}>
                            <Typography>
                                If you don't have an account,{' '}
                                <Link component={RouterLink} color='inherit' to='/auth/signup'>
                                    register here
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};
