import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';

export const SaveMyWalletApp = () => {
    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};
