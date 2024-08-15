import { useWalletStore } from '../stores';
import { callCreateExpenseApi, callGetCreditCardsApi } from '../api';
import { CreditCard, Expense } from '../types';
import { enqueueSnackbar } from 'notistack';

export const useWallet = () => {
    const walletData = useWalletStore((store) => store.walletData);
    const setWalletData = useWalletStore((store) => store.setWalletData);
    const addExpense = useWalletStore((store) => store.addExpense);
    const creditCards = useWalletStore((store) => store.creditCards.fullList);
    const mainCreditCards = useWalletStore((store) => store.creditCards.mainList);
    const simpleCreditCards = useWalletStore((store) => store.creditCards.simpleList);
    const purchases = useWalletStore((store) => store.expenses.purchases);
    const subscriptions = useWalletStore((store) => store.expenses.subscriptions);
    const paymentFullList = useWalletStore((store) => store.payments.fullList);
    const paymentPendingList = useWalletStore((store) => store.payments.pendingList);
    const paymentDoneList = useWalletStore((store) => store.payments.doneList);
    const periods = useWalletStore((store) => store.payments.byPeriod);

    const updateWalletData = async () => {
        try {
            const walletData: CreditCard[] = await callGetCreditCardsApi();
            setWalletData(walletData);
            enqueueSnackbar(`Wallet info was updated`, { variant: 'info' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };
    
    const createExpense = async (expense: Expense) => {
        try {
            const newExpense = await callCreateExpenseApi(expense)
            addExpense(newExpense)
            enqueueSnackbar(`New expense '${newExpense.title}' added`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    return {
        walletData,
        creditCards,
        mainCreditCards,
        simpleCreditCards,
        purchases,
        subscriptions,
        paymentFullList,
        paymentPendingList,
        paymentDoneList,
        periods,

        updateWalletData,
        createExpense,
    };
};
