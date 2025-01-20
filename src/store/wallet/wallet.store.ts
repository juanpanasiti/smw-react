import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { WalletStore } from '../../types';

export const useWalletStore = create<WalletStore>()(
    devtools(
        (set, get) => ({
            // Attributes
            hasInitializedData: false,
            creditCards: [],
            expenses: [],

            // CreditCards
            setCreditCards: (creditCards) => set({ creditCards }),
            addCreditCard: (creditCard) => set({ creditCards: [...get().creditCards, creditCard] }),
            updateCreditCard: (creditCard) => set({ creditCards: get().creditCards.map((c) => (c.id === creditCard.id ? creditCard : c)) }),
            removeCreditCard: (creditCardId) => set({ creditCards: get().creditCards.filter((c) => c.id !== creditCardId) }),

            // Expenses
            setExpenses: (expenses) => set({ expenses }),
            addExpense: (expense) => set({ expenses: [...get().expenses, expense] }),
            updateExpense: (expense) => set({ expenses: get().expenses.map((e) => (e.id === expense.id ? expense : e)) }),
            removeExpense: (expenseId) => set({ expenses: get().expenses.filter((e) => e.id !== expenseId) }),

            // Payments
            addPayment: (payment) =>
                set({ expenses: get().expenses.map((e) => (e.id === payment.expenseId ? { ...e, payments: [...e.payments, payment] } : e)) }),
            updatePayment: (payment) =>
                set({
                    expenses: get().expenses.map((e) =>
                        e.id === payment.expenseId
                            ? {
                                  ...e,
                                  payments: e.payments.map((p) => (p.id === payment.id ? payment : p)),
                              }
                            : e
                    ),
                }),
            removePayment: (paymentId, expenseId) =>
                set({
                    expenses: get().expenses.map((e) =>
                        e.id === expenseId
                            ? {
                                  ...e,
                                  payments: e.payments.filter((p) => p.id !== paymentId),
                              }
                            : e
                    ),
                }),

            // Clear Data
            clear: () =>
                set({
                    creditCards: [],
                    expenses: [],
                    hasInitializedData: false,
                }),
            setInitializedData: () => set({ hasInitializedData: true }),
        }),

        { name: 'WalletStore' }
    )
);
