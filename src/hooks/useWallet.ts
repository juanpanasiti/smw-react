import { useCallback, useState } from 'react';

import { callCreateNewCreditCardApi, getAllCreditCardsApi, callUpdateCreditCardApi, callDeleteCreditCardApi, getAllExpensesApi } from '../api';
import { useWalletStore } from '../store/wallet';
import { NewCreditCard, UpdateCreditCard } from '../types/forms';
import { CreditCard } from '../types';

export const useWallet = () => {
    const [isLoading, setIsLoading] = useState(false);

    const creditCards = useWalletStore((store) => store.creditCards);
    const dataInitialized = useWalletStore((store) => store.hasInitializedData);
    const setDataInitialized = useWalletStore((store) => store.setInitializedData);
    const expenses = useWalletStore((store) => store.expenses);
    // const periods = useWalletStore((store) => store.periods);
    const setCreditCards = useWalletStore((store) => store.setCreditCards);
    const addCreditCard = useWalletStore((store) => store.addCreditCard);
    const updateCreditCard = useWalletStore((store) => store.updateCreditCard);
    const removeCreditCard = useWalletStore((store) => store.removeCreditCard);
    const setExpenses = useWalletStore((store) => store.setExpenses);
    // const addExpense = useWalletStore((store) => store.addExpense);
    // const updateExpense = useWalletStore((store) => store.updateExpense);
    // const deleteExpense = useWalletStore((store) => store.deleteExpense);
    // const setPeriods = useWalletStore((store) => store.setPeriods);
    // const addPeriod = useWalletStore((store) => store.addPeriod);
    // const updatePeriod = useWalletStore((store) => store.updatePeriod);
    // const deletePeriod = useWalletStore((store) => store.deletePeriod);

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
        const newCreditCard = await callUpdateCreditCardApi(creditCard, ccId);
        updateCreditCard(newCreditCard);
    };

    const deleteCreditCard = async (ccId: number) => {
        await callDeleteCreditCardApi(ccId);
        removeCreditCard(ccId);
    };

    const getCreditCardById = (ccId: number): CreditCard | undefined => {
        return creditCards.find((cc) => cc.id === ccId) ;
    };

    return {
        isLoading,
        creditCards,
        expenses,
        // periods,

        setIsLoading,
        getDataFromApi,
        addNewCreditCard,
        editCreditCard,
        deleteCreditCard,
        getCreditCardById,
    };
};
