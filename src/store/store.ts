import { create } from 'zustand';

import { UserSlice, createUserSlice } from './userSlice';
import { CreditCardSlice, cerateCreditCardsSlice } from './creditCardsSlice';
import { createSubscriptionsSlice, SubscriptionSlice } from './subscriptionSlice';
import { createPaymentsSlice, PaymentSlice } from './paymentSlice';
import { createPurchasesSlice, PurchaseSlice } from './purchaseSlice';

export const useStore = create<UserSlice & CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice>((set, get, store) => ({
    ...createUserSlice(set, get, store),
    ...cerateCreditCardsSlice(set, get, store),
    ...createPurchasesSlice(set, get, store),
    ...createSubscriptionsSlice(set, get, store),
    ...createPaymentsSlice(set, get, store),
}));
