import { StateCreator } from 'zustand';

import { CreditCard } from './interfaces';
import { UserSlice } from './userSlice';

export interface CreditCardSlice {
    creditCards: CreditCard[];
    setCreditCards: (creditCards: CreditCard[]) => void;
    addCreditCard: (creditCard: CreditCard) => void;
    updateCreditCard: (creditCard: CreditCard) => void;
    deleteCreditCard: (creditCard: CreditCard) => void;
}

export const cerateCreditCardsSlice: StateCreator<CreditCardSlice & UserSlice, [], [], CreditCardSlice> = (set) => ({
    creditCards: [],
    setCreditCards: (creditCards: CreditCard[]) => set({ creditCards }),
    addCreditCard: (creditCard: CreditCard) => set((state) => ({ creditCards: [...state.creditCards, creditCard] })),
    updateCreditCard: (creditCard: CreditCard) =>
        set((state) => ({ creditCards: state.creditCards.map((cc) => (cc.id === creditCard.id ? creditCard : cc)) })),
    deleteCreditCard: (creditCard: CreditCard) => set((state) => ({ creditCards: state.creditCards.filter((cc) => cc.id !== creditCard.id) })),
});
