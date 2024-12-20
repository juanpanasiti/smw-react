import { callCreateNewCreditCardApi, callGetCreditCardListApi, callUpdateCreditCardApi, callDeleteCreditCardApi } from '../api';
import { useWalletStore } from '../store/wallet';
import { NewCreditCard, UpdateCreditCard } from '../types/forms';

export const useWallet = () => {
    const creditCards = useWalletStore((store) => store.creditCards);
    const dataInitialized = useWalletStore((store) => store.hasInitializedData);
    const setDataInitialized = useWalletStore((store) => store.setInitializedData);
    // const expenses = useWalletStore((store) => store.expenses);
    // const periods = useWalletStore((store) => store.periods);
    const setCreditCards = useWalletStore((store) => store.setCreditCards);
    const addCreditCard = useWalletStore((store) => store.addCreditCard);
    const updateCreditCard = useWalletStore((store) => store.updateCreditCard);
    const removeCreditCard = useWalletStore((store) => store.removeCreditCard);
    // const setExpenses = useWalletStore((store) => store.setExpenses);
    // const addExpense = useWalletStore((store) => store.addExpense);
    // const updateExpense = useWalletStore((store) => store.updateExpense);
    // const deleteExpense = useWalletStore((store) => store.deleteExpense);
    // const setPeriods = useWalletStore((store) => store.setPeriods);
    // const addPeriod = useWalletStore((store) => store.addPeriod);
    // const updatePeriod = useWalletStore((store) => store.updatePeriod);
    // const deletePeriod = useWalletStore((store) => store.deletePeriod);

    const getDataFromApi = async () => {
        if (!dataInitialized) {
            const creditCards = await callGetCreditCardListApi(10, 0);
            setCreditCards(creditCards);
            setDataInitialized();
        }
    };

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

    return {
        creditCards,
        // expenses,
        // periods,

        getDataFromApi,
        addNewCreditCard,
        editCreditCard,
        deleteCreditCard,
    };
};
