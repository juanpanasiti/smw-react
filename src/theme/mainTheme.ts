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
            main: '#1E88E5',
            light: '#90CAF9',
            dark: '#1565C0',
            contrastText: '#ffffff',
        },

        background: {
            paper: '#303030',
            default: '#212121',
        },
        text: {
            primary: '#ffffff',
            secondary: '#c7c7c7',
            disabled: '#bdbdbd',
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
            active: '#007566',
            hover: '#8FC1B5',
            selected: '#B3E5C2',
            disabled: '#A1A1A1',
            disabledBackground: '#E0E0E0',
            focus: '#B3E5C2',
        },
    },
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
    },
});
