import { StateCreator } from 'zustand';

import { Purchase } from './interfaces';
import { CreditCardSlice, SubscriptionSlice, PaymentSlice } from '.';

export interface PurchaseSlice {
    purchases: Purchase[];
    setPurchases: (purchases: Purchase[]) => void;
    addPurchase: (purchase: Purchase) => void;
    updatePurchase: (purchase: Purchase) => void;
    deletePurchase: (purchase: Purchase) => void;
}

export const createPurchasesSlice: StateCreator<CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice, [], [], PurchaseSlice> = (
    set
) => ({
    purchases: [],
    setPurchases: (purchases: Purchase[]) => set({ purchases }),
    addPurchase: (purchase: Purchase) => set((state) => ({ purchases: [...state.purchases, purchase] })),
    updatePurchase: (purchase: Purchase) => set((state) => ({ purchases: state.purchases.map((cc) => (cc.id === purchase.id ? purchase : cc)) })),
    deletePurchase: (purchase: Purchase) => set((state) => ({ purchases: state.purchases.filter((cc) => cc.id !== purchase.id) })),
});
