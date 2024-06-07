import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { AppRouter } from './router';
import { AppTheme } from './theme';

const queryClient = new QueryClient();

export const SaveMyWalletApp = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <AppTheme>
                    <AppRouter />
                </AppTheme>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </BrowserRouter>
    );
};
