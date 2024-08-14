import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { CreditCardMain, CreditCardSimpleItem, Purchase, Subscription, Payment, WalletStore, CreditCard, Period, PaymentStatusEnum } from '../../types';
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
            clearData: () => set({ walletData: [] }),
            updateCreditCard: () => set({ walletData: [] }),
            updateExpense: () => set({ walletData: [] }),
            updatePayment: () => set({ walletData: [] }),
        }),
        { name: 'WalletStore' }
    )
);
