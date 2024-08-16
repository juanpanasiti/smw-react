import { enqueueSnackbar } from 'notistack';

import { useWalletStore } from '../stores';
import { callCreateExpenseApi, callDeleteExpenseApi, callGetCreditCardsApi, callUpdateExpenseApi } from '../api';
import { CreditCard, Expense, Payment } from '../types';
import { callCreateSubscriptionPaymentApi, callUpdatePaymentApi } from '../api/payments.api';

export const useWallet = () => {
    const walletData = useWalletStore((store) => store.walletData);
    const setWalletData = useWalletStore((store) => store.setWalletData);
    const addExpense = useWalletStore((store) => store.addExpense);
    const modifyExpense = useWalletStore((store) => store.modifyExpense);
    const removeExpense = useWalletStore((store) => store.removeExpense);
    const modifyPayment = useWalletStore((store) => store.modifyPayment);
    const addPayment = useWalletStore((store) => store.addPayment);
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
            const newExpense = await callCreateExpenseApi(expense);
            addExpense(newExpense);
            enqueueSnackbar(`New expense '${newExpense.title}' added`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    const updateExpense = async (expense: Expense) => {
        try {
            const updatedExpense = await callUpdateExpenseApi(expense);
            modifyExpense(updatedExpense);
            enqueueSnackbar(`Expense '${updatedExpense.title}' updated`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    const deleteExpense = async ({ id, creditCardId }: Pick<Expense, 'id' | 'creditCardId'>) => {
        try {
            await callDeleteExpenseApi(id);
            removeExpense(creditCardId, id);
            enqueueSnackbar(`Expense deleted`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    const updatePayment = async (payment: Payment) => {
        try {
            const expensePayment = await callUpdatePaymentApi(payment);
            modifyPayment(payment.creditCardId, expensePayment)
            enqueueSnackbar(`Payment #${payment.noInstallment} for ${payment.expenseTitle} updated`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    };

    const createNewSubscriptionPayment = async (payment: Payment) => {
        try {
            const newPayment = await callCreateSubscriptionPaymentApi(payment);
            addPayment(payment.creditCardId, newPayment)
            enqueueSnackbar(`New payment  for ${payment.expenseTitle}`, { variant: 'success' });
        } catch (error) {
            enqueueSnackbar(`${error}`, { variant: 'error' });
        }
    }

    const paymentsByExpense = (expenseId: number) => paymentFullList.filter((payment) => payment.expenseId === expenseId);

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
        updateExpense,
        deleteExpense,
        paymentsByExpense,
        updatePayment,
        createNewSubscriptionPayment,
    };
};
