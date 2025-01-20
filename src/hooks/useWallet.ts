import { useCallback, useState } from 'react';

import {
    callCreateNewCreditCardApi,
    getAllCreditCardsApi,
    callUpdateCreditCardApi,
    callDeleteCreditCardApi,
    getAllExpensesApi,
    callCreateNewExpenseApi,
    callUpdateExpenseApi,
    callDeleteExpenseApi,
    callUpdatePurchasePayment,
    callUpdateSubscriptionPayment,
} from '../api';
import { useWalletStore } from '../store/wallet';
import {
    CreditCardOption,
    NewCreditCard,
    NewExpense,
    UpdateCreditCard,
    UpdateExpense,
    UpdatePurchasePayment,
    UpdateSubscriptionPayment,
} from '../types/forms';
import { CreditCard, Expense } from '../types';

export const useWallet = () => {
    const [isLoading, setIsLoading] = useState(false);

    const creditCards = useWalletStore((store) => store.creditCards);
    const dataInitialized = useWalletStore((store) => store.hasInitializedData);
    const setDataInitialized = useWalletStore((store) => store.setInitializedData);
    const expenses = useWalletStore((store) => store.expenses);
    const setCreditCards = useWalletStore((store) => store.setCreditCards);
    const addCreditCard = useWalletStore((store) => store.addCreditCard);
    const updateCreditCard = useWalletStore((store) => store.updateCreditCard);
    const removeCreditCard = useWalletStore((store) => store.removeCreditCard);
    const setExpenses = useWalletStore((store) => store.setExpenses);
    const addExpense = useWalletStore((store) => store.addExpense);
    const updateExpense = useWalletStore((store) => store.updateExpense);
    const removeExpense = useWalletStore((store) => store.removeExpense);
    // const addPayment = useWalletStore((store) => store.addPayment);
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

    const getCreditCardById = (ccId: number): CreditCard | undefined => {
        return creditCards.find((cc) => cc.id === ccId);
    };

    const getCreditCardOptions = (filterMain: boolean = true): CreditCardOption[] => {
        const response = filterMain ? creditCards.filter((cc) => cc.mainCreditCardId === null) : creditCards;
        return response.map((cc) => ({
            id: cc.id,
            alias: cc.alias,
        }));
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

    const getExpenseById = (expenseId: number): Expense | undefined => {
        return expenses.find((expense) => expense.id === expenseId);
    };

    const editPurchasePayment = async (paymentData: UpdatePurchasePayment, purchaseId: number, paymentId: number) => {
        const expense = await callUpdatePurchasePayment(paymentData, paymentId, purchaseId);
        updateExpense(expense);
    };

    const editSubscriptionPayment = async (paymentData: UpdateSubscriptionPayment, subscriptionId: number, paymentId: number, accountId: number) => {
        const payment = await callUpdateSubscriptionPayment(paymentData, paymentId, subscriptionId, accountId);
        updatePayment(payment);
    };

    return {
        isLoading,
        creditCards,
        expenses,
        // periods,

        setIsLoading,
        getDataFromApi,
        // CreditCard
        addNewCreditCard,
        editCreditCard,
        deleteCreditCard,
        getCreditCardById,
        getCreditCardOptions,
        // Expense
        addNewExpense,
        editExpense,
        deleteExpense,
        getExpenseById,
        // Payments
        editPurchasePayment,
        editSubscriptionPayment,
    };
};
