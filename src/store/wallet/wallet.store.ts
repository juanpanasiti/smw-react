import { create } from 'zustand';
import { WalletStore } from '../../types';
import { devtools } from 'zustand/middleware';

export const useWalletStore = create<WalletStore>()(
    devtools(
        (set, get) => ({
            // Attributes
            hasInitializedData: false,
            creditCards: [],
            expenses: [],
            periods: [],

            // CreditCards
            setCreditCards: (creditCards) => set({ creditCards }),
            addCreditCard: (creditCard) => set({ creditCards: [...get().creditCards, creditCard] }),
            updateCreditCard: (creditCard) => set({ creditCards: get().creditCards.map((c) => (c.id === creditCard.id ? creditCard : c)) }),
            deleteCreditCard: (creditCardId) => set({ creditCards: get().creditCards.filter((c) => c.id !== creditCardId) }),

            // Expenses
            setExpenses: (expenses) => set({ expenses }),
            addExpense: (expense) => set({ expenses: [...get().expenses, expense] }),
            updateExpense: (expense) => set({ expenses: get().expenses.map((e) => (e.id === expense.id ? expense : e)) }),
            deleteExpense: (expenseId) => set({ expenses: get().expenses.filter((e) => e.id !== expenseId) }),

            // Periods
            setPeriods: (periods) => set({ periods }),
            addPeriod: (period) => set({ periods: [...get().periods, period] }),
            updatePeriod: (period) => set({ periods: get().periods.map((p) => (p.id === period.id ? period : p)) }),
            deletePeriod: (periodId) => set({ periods: get().periods.filter((p) => p.id !== periodId) }),

            // Clear Data
            clear: () =>
                set({
                    creditCards: [],
                    expenses: [],
                    periods: [],
                }),
            setInitializedData: () => set({ hasInitializedData: true }),
        }),

        { name: 'WalletStore' }
    )
);
