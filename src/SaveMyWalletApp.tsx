import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './router';
import { AppTheme } from './theme';

export const SaveMyWalletApp = () => {
    return (
        <BrowserRouter>
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </BrowserRouter>
    );
};
