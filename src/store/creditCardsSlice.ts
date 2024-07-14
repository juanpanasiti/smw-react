import { StateCreator } from 'zustand';

import { CreditCardMain } from './interfaces';
import { StoreType } from '.';
import { CreditCard } from '../wallet/api/interfaces';
import { parseCreditCardExtensionToStore, parseCreditCardMainToStore } from './helpers';

export interface CreditCardSlice {
    creditCards: CreditCardMain[];
    setCreditCards: (creditCards: CreditCardMain[]) => void;
    addCreditCard: (creditCard: CreditCard) => void;
    updateCreditCard: (creditCard: CreditCard) => void;
    deleteCreditCard: (cardId: number) => void;
    deleteCreditCards: () => void;
}

export const createCreditCardsSlice: StateCreator<StoreType, [], [], CreditCardSlice> = (set) => ({
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
    updateCreditCard: (creditCard: CreditCard) =>
        set((state) => {
            if (creditCard.isMainCreitCard) {
                return {
                    creditCards: state.creditCards.map((ccMain) =>
                        ccMain.id !== creditCard.id ? ccMain : { ...parseCreditCardMainToStore(creditCard), extensions: [...ccMain.extensions] }
                    ),
                };
            }
            return {
                creditCards: state.creditCards.map((main) => {
                    if (main.id === creditCard.mainCreditCardId) {
                        return {
                            ...main,
                            extensions: main.extensions.map((ccExt) =>
                                ccExt.id !== creditCard.id ? ccExt : parseCreditCardExtensionToStore(creditCard)
                            ),
                        };
                    }
                    return main;
                }),
            };
        }),
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
    deleteCreditCards: () => set({ creditCards: [] }),
});
