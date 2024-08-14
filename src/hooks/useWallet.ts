import { useWalletStore } from '../stores';
import { callGetCreditCardsApi } from '../api';
import { CreditCard } from '../types';

export const useWallet = () => {
    const walletData = useWalletStore((store) => store.walletData);
    const setWalletData = useWalletStore((store) => store.setWalletData);
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
        const walletData: CreditCard[] = await callGetCreditCardsApi();
        setWalletData(walletData);
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
    };
};
