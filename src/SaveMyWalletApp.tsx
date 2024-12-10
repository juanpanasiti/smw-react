import { BrowserRouter } from 'react-router';

import { AppRouter } from './router/AppRouter';
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
