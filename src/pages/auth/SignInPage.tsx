import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, InputAdornment, IconButton, Typography, Box, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignInForm } from '../../types';
import { useAuth } from '../../hooks';

const SignInSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
});

export const SignInPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const initialValues: SignInForm = {
        username: '',
        password: '',
    };

    const handleSubmit = (formValues: SignInForm) => {
        login(formValues);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ width: 300, margin: '0 auto', paddingTop: '2rem' }}>
            <Typography variant='h4' align='center' gutterBottom>
                Sign In
            </Typography>
            <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <Field
                            as={TextField}
                            name='username'
                            label='Username'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            error={touched.username && !!errors.username}
                            helperText={touched.username && errors.username}
                        />
                        <Field
                            as={TextField}
                            name='password'
                            label='Password'
                            type={showPassword ? 'text' : 'password'}
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            error={touched.password && !!errors.password}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handleClickShowPassword} edge='end'>
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: '1rem' }}>
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography align='center' sx={{ marginTop: '1rem' }}>
                Don't have an account?{' '}
                <Link href='/auth/signup' underline='hover'>
                    Click here
                </Link>
            </Typography>
        </Box>
    );
};
