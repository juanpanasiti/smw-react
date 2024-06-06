import { StateCreator } from 'zustand';

import { Profile, Settings, User } from './interfaces';
import { CreditCardSlice } from './creditCardsSlice';
import { SubscriptionSlice } from './subscriptionSlice';
import { PaymentSlice } from './paymentSlice';
import { PurchaseSlice } from './purchaseSlice';

export interface UserSlice {
    user?: User;
    profile?: Profile;
    settings?: Settings;
    setUser: (user: User) => void;
    setProfile: (profile: Profile) => void;
    setSettings: (settings: Settings) => void;
}

export const createUserSlice: StateCreator<UserSlice & CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice, [], [], UserSlice> = (set) => ({
    user: undefined,
    profile: undefined,
    settings: undefined,
    setUser: (user) => set({ user }),
    setProfile: (profile) => set({ profile }),
    setSettings: (settings) => set({ settings }),
});
