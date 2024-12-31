import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007566',
            light: '#8FC1B5',
            dark: '#265C4B',
            contrastText: '#ffffff',
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
        common: {
            black: '#000000',
            white: '#ffffff',
        },
        action: {
            active: '#1976d2',
            hover: '#e3f2fd',
            selected: '#e3f2fd',
            disabled: '#bdbdbd',
            disabledBackground: '#bdbdbd',
            focus: '#e3f2fd',
        },
    },
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});
