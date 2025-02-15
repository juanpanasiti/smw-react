import { useCallback, useState } from 'react';
import {
    callCreateNewCreditCardApi,
    callCreateNewExpenseApi,
    callDeleteCreditCardApi,
    callDeleteExpenseApi,
    callDeleteSubscriptionPayment,
    callUpdateCreditCardApi,
    callUpdateExpenseApi,
    callUpdatePurchasePayment,
    callUpdateSubscriptionPayment,
    getAllCreditCardsApi,
    getAllExpensesApi,
} from '../api';
import { useWalletStore } from '../store/wallet';
import { NewCreditCard, NewExpense, UpdateCreditCard, UpdateExpense, UpdatePurchasePayment, UpdateSubscriptionPayment } from '../types/forms';

export const useWalletMigrations = () => {
    const [isLoading, setIsLoading] = useState(false);

    const dataInitialized = useWalletStore((store) => store.hasInitializedData);
    const setDataInitialized = useWalletStore((store) => store.setInitializedData);
    const setCreditCards = useWalletStore((store) => store.setCreditCards);
    const addCreditCard = useWalletStore((store) => store.addCreditCard);
    const updateCreditCard = useWalletStore((store) => store.updateCreditCard);
    const removeCreditCard = useWalletStore((store) => store.removeCreditCard);
    const setExpenses = useWalletStore((store) => store.setExpenses);
    const addExpense = useWalletStore((store) => store.addExpense);
    const updateExpense = useWalletStore((store) => store.updateExpense);
    const removeExpense = useWalletStore((store) => store.removeExpense);
    const removePayment = useWalletStore((store) => store.removePayment);
    const updatePayment = useWalletStore((store) => store.updatePayment);

    const getDataFromApi = useCallback(async () => {
            if (!dataInitialized && !isLoading) {
                const creditCards = await getAllCreditCardsApi();
                const expenses = await getAllExpensesApi();
                setCreditCards(creditCards);
                setExpenses(expenses);
                setDataInitialized();
            }
        }, [dataInitialized, setDataInitialized, setCreditCards, setExpenses, isLoading]);

    const addNewCreditCard = async (creditCard: NewCreditCard) => {
        const newCreditCard = await callCreateNewCreditCardApi(creditCard);
        addCreditCard(newCreditCard);
    };

    const editCreditCard = async (creditCard: UpdateCreditCard, ccId: number) => {
        const updatedCreditCard = await callUpdateCreditCardApi(creditCard, ccId);
        updateCreditCard(updatedCreditCard);
    };
    const deleteCreditCard = async (ccId: number) => {
        await callDeleteCreditCardApi(ccId);
        removeCreditCard(ccId);
    };

    const addNewExpense = async (expense: NewExpense) => {
        const newExpense = await callCreateNewExpenseApi(expense);
        addExpense(newExpense);
    };

    const editExpense = async (expense: UpdateExpense, expenseId: number) => {
        const updatedExpense = await callUpdateExpenseApi(expense, expenseId);
        updateExpense(updatedExpense);
    };

    const deleteExpense = async (expenseId: number) => {
        await callDeleteExpenseApi(expenseId);
        removeExpense(expenseId);
    };

    const editPurchasePayment = async (paymentData: UpdatePurchasePayment, purchaseId: number, paymentId: number) => {
        const expense = await callUpdatePurchasePayment(paymentData, paymentId, purchaseId);
        updateExpense(expense);
    };

    const editSubscriptionPayment = async (paymentData: UpdateSubscriptionPayment, subscriptionId: number, paymentId: number, accountId: number) => {
        const payment = await callUpdateSubscriptionPayment(paymentData, paymentId, subscriptionId, accountId);
        updatePayment(payment);
    };

    const deleteSubscriptionPayment = async (subscriptionId: number, paymentId: number) => {
        await callDeleteSubscriptionPayment(subscriptionId, paymentId);
        removePayment(paymentId, subscriptionId);
    };

    return {
        // init
        getDataFromApi,
        setIsLoading,
        // Credit Cards
        addNewCreditCard,
        editCreditCard,
        deleteCreditCard,
        // Expenses
        addNewExpense,
        editExpense,
        deleteExpense,
        // Payments
        editPurchasePayment,
        editSubscriptionPayment,
        deleteSubscriptionPayment,
    };
};
