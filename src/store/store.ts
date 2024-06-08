import { create } from 'zustand';

import { CreditCardSlice, cerateCreditCardsSlice } from './creditCardsSlice';
import { createSubscriptionsSlice, SubscriptionSlice } from './subscriptionSlice';
import { createPaymentsSlice, PaymentSlice } from './paymentSlice';
import { createPurchasesSlice, PurchaseSlice } from './purchaseSlice';

export const useStore = create< CreditCardSlice & SubscriptionSlice & PaymentSlice & PurchaseSlice>((set, get, store) => ({
    ...cerateCreditCardsSlice(set, get, store),
    ...createPurchasesSlice(set, get, store),
    ...createSubscriptionsSlice(set, get, store),
    ...createPaymentsSlice(set, get, store),
}));
