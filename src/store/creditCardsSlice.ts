import { StateCreator } from 'zustand';

import { CreditCardMain } from './interfaces';
import { PaymentSlice, PurchaseSlice, SubscriptionSlice } from '.';
import { CreditCard } from '../wallet/api/interfaces';
import { parseCreditCardExtensionToStore, parseCreditCardMainToStore } from './helpers';

export interface CreditCardSlice {
    creditCards: CreditCardMain[];
    setCreditCards: (creditCards: CreditCardMain[]) => void;
    addCreditCard: (creditCard: CreditCard) => void;
    updateCreditCard: (creditCard: CreditCardMain) => void;
    deleteCreditCard: (cardId: number) => void;
}

export const cerateCreditCardsSlice: StateCreator<CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice, [], [], CreditCardSlice> = (
    set
) => ({
    creditCards: [],
    setCreditCards: (creditCards: CreditCardMain[]) => set({ creditCards }),
    addCreditCard: (creditCard: CreditCard) =>
        set((state) => {
            if (creditCard.isMainCreitCard) {
                return { creditCards: [...state.creditCards, parseCreditCardMainToStore(creditCard)] };
            }
            return {
                creditCards: state.creditCards.map((main) => {
                    if (main.id === creditCard.mainCreditCardId) {
                        return { ...main, extensions: [...main.extensions, parseCreditCardExtensionToStore(creditCard)] };
                    }
                    return main;
                }),
            };
        }),
    updateCreditCard: (creditCard: CreditCardMain) =>
        set((state) => ({ creditCards: state.creditCards.map((cc) => (cc.id === creditCard.id ? creditCard : cc)) })),
    deleteCreditCard: (cardId: number) =>
        set((state) => {
            let filtered = state.creditCards.filter((cc) => cc.id !== cardId);
            if (filtered.length < state.creditCards.length) {
                return { creditCards: filtered };
            }
            filtered = state.creditCards.map((main) => ({
                ...main,
                extensions: main.extensions.filter((ext) => ext.id !== cardId),
            }));
            return { creditCards: filtered };
        }),
});
