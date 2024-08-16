import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
    CreditCardMain,
    CreditCardSimpleItem,
    Purchase,
    Subscription,
    Payment,
    WalletStore,
    CreditCard,
    Period,
    PaymentStatusEnum,
    CCExpense,
} from '../../types';
import {
    getPeriods,
    parseCreditCardMain,
    parseCreditCardMainList,
    parseCreditCardSimpleList,
    parsePaymentList,
    parsePurchaseList,
    parseSubscriptionList,
} from './wallet.parsers';

export const useWalletStore = create<WalletStore>()(
    devtools(
        (set, get) => ({
            walletData: undefined,

            creditCards: {
                get fullList(): CreditCardMain[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return walletData.map(parseCreditCardMain);
                },
                get mainList(): CreditCardMain[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parseCreditCardMainList(walletData);
                },
                get simpleList(): CreditCardSimpleItem[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parseCreditCardSimpleList(walletData);
                },
            },
            expenses: {
                get purchases(): Purchase[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parsePurchaseList(walletData);
                },
                get subscriptions(): Subscription[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parseSubscriptionList(walletData);
                },
            },
            payments: {
                get fullList(): Payment[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parsePaymentList(walletData);
                },
                get pendingList(): Payment[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parsePaymentList(walletData, [PaymentStatusEnum.CONFIRMED, PaymentStatusEnum.SIMULATED, PaymentStatusEnum.UNCONFIRMED]);
                },
                get doneList(): Payment[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return parsePaymentList(walletData, [PaymentStatusEnum.PAID]);
                },
                get byPeriod(): Period[] {
                    const walletData = get()?.walletData;
                    if (walletData === undefined) return [];

                    return getPeriods(walletData);
                },
            },

            setWalletData: (walletData: CreditCard[]) => set({ walletData }),
            addExpense: (expense: CCExpense) => {
                const walletData = get()?.walletData;
                if (walletData === undefined) return;
                set({ walletData: walletData.map((cc) => (cc.id === expense.creditCardId ? { ...cc, expenses: [...cc.expenses, expense] } : cc)) });
            },
            modifyExpense: (expense: CCExpense) => {
                const walletData = get()?.walletData;
                if (walletData === undefined) return;
                set({
                    walletData: walletData.map((cc) =>
                        cc.id === expense.creditCardId ? { ...cc, expenses: cc.expenses.map((e) => (e.id === expense.id ? expense : e)) } : cc
                    ),
                });
            },
            removeExpense: (creditCardId: number, expenseId: number) => {
                const walletData = get()?.walletData;
                if (walletData === undefined) return;
                set({
                    walletData: walletData.map((cc) =>
                        cc.id === creditCardId ? { ...cc, expenses: cc.expenses.filter((e) => e.id !== expenseId) } : cc
                    ),
                });
            },
            clearData: () => set({ walletData: [] }),
            updateCreditCard: () => set({ walletData: [] }),
            updatePayment: () => set({ walletData: [] }),
        }),
        { name: 'WalletStore' }
    )
);
