import { create } from 'zustand';

import { CreditCardSlice, cerateCreditCardsSlice } from './creditCardsSlice';
import { createSubscriptionsSlice, SubscriptionSlice } from './subscriptionSlice';
import { createPaymentsSlice, PaymentSlice } from './paymentSlice';
import { createPurchasesSlice, PurchaseSlice } from './purchaseSlice';
import { AuthSlice, createAuthSlice } from './authSlice';
import { SettingsSlice } from './settingsSlice';

export type StoreType = AuthSlice & SettingsSlice & CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice;
export const useStore = create<StoreType>((set, get, store) => ({
    ...cerateCreditCardsSlice(set, get, store),
    ...createPurchasesSlice(set, get, store),
    ...createSubscriptionsSlice(set, get, store),
    ...createPaymentsSlice(set, get, store),
    ...createAuthSlice(set, get, store),
}));
