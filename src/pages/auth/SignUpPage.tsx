import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, InputAdornment, IconButton, Typography, Box, Link } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SignUpApiRequest } from '../../types';

const SignUpSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    password: Yup.string().required('Password is required'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export const SignUpPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const initialValues: SignUpApiRequest & { confirm_password: string } = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
    };

    const handleSubmit = (values: SignUpApiRequest) => {
        console.table(values);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{ width: 300, margin: '0 auto', paddingTop: '2rem' }}>
            <Typography variant='h4' align='center' gutterBottom>
                Sign Up
            </Typography>
            <Formik initialValues={initialValues} validationSchema={SignUpSchema} onSubmit={handleSubmit}>
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
                            name='email'
                            label='Email'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            error={touched.email && !!errors.email}
                            helperText={touched.email && errors.email}
                        />
                        <Field
                            as={TextField}
                            name='first_name'
                            label='First Name'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            error={touched.first_name && !!errors.first_name}
                            helperText={touched.first_name && errors.first_name}
                        />
                        <Field
                            as={TextField}
                            name='last_name'
                            label='Last Name'
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            error={touched.last_name && !!errors.last_name}
                            helperText={touched.last_name && errors.last_name}
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
                        <Field
                            as={TextField}
                            name='confirm_password'
                            label='Confirm Password'
                            type={showPassword ? 'text' : 'password'}
                            variant='outlined'
                            fullWidth
                            margin='normal'
                            error={touched.confirm_password && !!errors.confirm_password}
                            helperText={touched.confirm_password && errors.confirm_password}
                        />
                        <Button type='submit' variant='contained' color='primary' fullWidth sx={{ marginTop: '1rem' }}>
                            Sign Up
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography align='center' sx={{ marginTop: '1rem' }}>
                Already have an account?{' '}
                <Link href='/signin' underline='hover'>
                    Click here
                </Link>
            </Typography>
        </Box>
    );
};
