import { CreditCard, Expense, Payment as PaymentApi } from '../../wallet/api/interfaces';
import { CreditCardExtension, CreditCardMain, Purchase, Subscription, Payment } from '../interfaces';

//! Credit Cards
export const parseCreditCardListToStore = (creditCards: CreditCard[]): CreditCardMain[] => {
    const ccMainList: CreditCardMain[] = creditCards.filter((creditCard) => creditCard.isMainCreitCard).map(parseCreditCardMainToStore);
    return ccMainList.map((main) => {
        const extensions = creditCards.filter((cc) => cc.mainCreditCardId === main.id).map(parseCreditCardExtensionToStore);
        const totalSpent = extensions.reduce((acc, curr) => acc + curr.totalSpent, 0) + main.subtotalSpent;
        return {
            ...main,
            extensions,
            totalSpent,
        };
    });
};
export const parseCreditCardMainToStore = (creditCard: CreditCard): CreditCardMain => ({
    id: creditCard.id,
    alias: creditCard.alias,
    limit: creditCard.limit,
    nextClosingDate: creditCard.nextClosingDate,
    nextExpiringDate: creditCard.nextExpiringDate,
    totalSpent: 0,
    subtotalSpent: creditCard.totalSpent,
    createdAt: creditCard.createdAt,
    updatedAt: creditCard.updatedAt,
    isEnabled: creditCard.isEnabled,
    extensions: [],
});
export const parseCreditCardExtensionToStore = (creditCard: CreditCard): CreditCardExtension => ({
    id: creditCard.id,
    alias: creditCard.alias,
    totalSpent: creditCard.totalSpent,
    createdAt: creditCard.createdAt,
    updatedAt: creditCard.updatedAt,
    isEnabled: creditCard.isEnabled,
});

//! Purchases
export const parsePurchaseListtoStore = (purchases: Expense[]): Purchase[] => purchases.map(parsePurchaseToStore);
export const parsePurchaseToStore = (purchase: Expense): Purchase => ({
    id: purchase.id,
    creditCardId: purchase.creditCardId,
    title: purchase.title,
    ccName: purchase.ccName,
    acquiredAt: purchase.acquiredAt,
    amount: purchase.amount,
    noInstallments: purchase.installments,
    firstPaymentDate: purchase.firstPaymentDate,
    status: purchase.status,
    remainingAmount: purchase.remainingAmount,
    totalPaid: purchase.totalPaid,
    installmentsPaid: purchase.installmentsPaid,
    installmentsPending: purchase.installmentsPending,
});

//! Subscriptions
export const parseSubscriptionListtoStore = (subscriptions: Expense[]): Subscription[] => subscriptions.map(parseSubscriptionToStore);
export const parseSubscriptionToStore = (subscription: Expense): Subscription => ({
    id: subscription.id,
    creditCardId: subscription.creditCardId,
    title: subscription.title,
    ccName: subscription.ccName,
    amount: subscription.amount,
    status: subscription.status,
    acquiredAt: subscription.acquiredAt,
    firstPaymentDate: subscription.firstPaymentDate,
});

//! Payments
export const parsePaymentListtoStore = (payments: PaymentApi[]): Payment[] => payments.map(parsePaymentToStore);
export const parsePaymentToStore = (payment: PaymentApi): Payment => ({
    id: payment.id,
    expenseId: payment.expenseId,
    creditCardId: payment.creditCardId,
    status: payment.status,
    noInstallment: payment.noInstallment,
    month: payment.month,
    year: payment.year,
    amount: payment.amount,
    expenseTitle: payment.expenseTitle,
    expenseCcName: payment.expenseCcName,
});
