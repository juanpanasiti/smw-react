import { BrowserRouter } from 'react-router';
import { SnackbarProvider } from 'notistack';

import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';
export const SaveMyWalletApp = () => {
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
