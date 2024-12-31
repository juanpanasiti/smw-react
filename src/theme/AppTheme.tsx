import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import { mainTheme } from './';

interface Props {
    children: React.ReactNode;
}
export const AppTheme = ({ children }: Props) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
