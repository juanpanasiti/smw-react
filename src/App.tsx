import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router';
import { AppTheme } from './theme';
import { SnackbarProvider } from 'notistack';

export const App = () => {
    return (
        <BrowserRouter>
            <AppTheme>
                <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
                    <AppRouter />
                </SnackbarProvider>
            </AppTheme>
        </BrowserRouter>
    );
};
