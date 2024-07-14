import { StateCreator } from 'zustand';

import { Subscription } from './interfaces';
import { StoreType } from '.';

export interface SubscriptionSlice {
    subscriptions: Subscription[];
    setSubscriptions: (subscriptions: Subscription[]) => void;
    addSubscription: (subscription: Subscription) => void;
    updateSubscription: (subscription: Subscription) => void;
    deleteSubscription: (id: number) => void;
    deleteSubscriptions: () => void;
}

export const createSubscriptionsSlice: StateCreator<StoreType, [], [], SubscriptionSlice> = (
    set
) => ({
    subscriptions: [],
    setSubscriptions: (subscriptions: Subscription[]) => set({ subscriptions }),
    addSubscription: (subscription: Subscription) => set((state) => ({ subscriptions: [...state.subscriptions, subscription] })),
    updateSubscription: (subscription: Subscription) =>
        set((state) => ({ subscriptions: state.subscriptions.map((s) => (s.id === subscription.id ? subscription : s)) })),
    deleteSubscription: (id: number) => set((state) => ({ subscriptions: state.subscriptions.filter((s) => s.id !== id) })),
    deleteSubscriptions: () => set({ subscriptions: [] }),
});
