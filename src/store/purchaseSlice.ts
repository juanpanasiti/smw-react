import { StateCreator } from 'zustand';

import { Purchase } from './interfaces';
import { StoreType } from '.';

export interface PurchaseSlice {
    purchases: Purchase[];
    setPurchases: (purchases: Purchase[]) => void;
    addPurchase: (purchase: Purchase) => void;
    updatePurchase: (purchase: Purchase) => void;
    deletePurchase: (id: number) => void;
}

export const createPurchasesSlice: StateCreator<StoreType, [], [], PurchaseSlice> = (set) => ({
    purchases: [],
    setPurchases: (purchases: Purchase[]) => set({ purchases }),
    addPurchase: (purchase: Purchase) => set((state) => ({ purchases: [...state.purchases, purchase] })),
    updatePurchase: (purchase: Purchase) => set((state) => ({ purchases: state.purchases.map((p) => (p.id === purchase.id ? purchase : p)) })),
    deletePurchase: (id: number) => set((state) => ({ purchases: state.purchases.filter((p) => p.id !== id) })),
});
