import { StateCreator } from 'zustand';

import { Subscription } from './interfaces';
import { CreditCardSlice, PaymentSlice, PurchaseSlice } from '.';

export interface SubscriptionSlice {
    subscriptions: Subscription[];
    setSubscriptions: (subscriptions: Subscription[]) => void;
    addSubscription: (subscription: Subscription) => void;
    updateSubscription: (subscription: Subscription) => void;
    deleteSubscription: (subscription: Subscription) => void;
}

export const createSubscriptionsSlice: StateCreator<CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice, [], [], SubscriptionSlice> = (set) => ({
    subscriptions: [],
    setSubscriptions: (subscriptions: Subscription[]) => set({ subscriptions }),
    addSubscription: (subscription: Subscription) => set((state) => ({ subscriptions: [...state.subscriptions, subscription] })),
    updateSubscription: (subscription: Subscription) =>
        set((state) => ({ subscriptions: state.subscriptions.map((cc) => (cc.id === subscription.id ? subscription : cc)) })),
    deleteSubscription: (subscription: Subscription) =>
        set((state) => ({ subscriptions: state.subscriptions.filter((cc) => cc.id !== subscription.id) })),
});
