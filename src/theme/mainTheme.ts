import { createTheme } from '@mui/material';

export const mainTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007566',
            light: '#8FC1B5',
            dark: '#265C4B',
            contrastText: '#222222',
        },
        secondary: {
            main: '#f44336',
            light: '#ff7961',
            dark: '#ba000d',
            contrastText: '#ffffff',
        },
        background: {
            paper: '#303030',
            default: '#212121',
        },
        text: {
            primary: '#ffffff',
            secondary: '#c7c7c7',
        },
        error: {
            main: '#f44336',
            light: '#ff7961',
            dark: '#ba000d',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ffeb3b',
            light: '#fff9c4',
            dark: '#f9a825',
            contrastText: '#000000',
        },
        success: {
            main: '#4caf50',
            light: '#81c784',
            dark: '#388e3c',
            contrastText: '#ffffff',
        },
        info: {
            main: '#2196f3',
            light: '#64b5f6',
            dark: '#0b72c4',
            contrastText: '#ffffff',
        },
    },
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});
