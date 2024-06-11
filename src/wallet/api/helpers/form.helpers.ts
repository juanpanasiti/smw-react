import { CreditCardMain } from '../../../store/interfaces';
import { ExpenseTypeEnum } from '../../enums';
import { CreditCard, Expense } from '../interfaces';

export const parseCreditCardMainToForm = (creditCardMain: CreditCardMain): CreditCard => {
    return {
        id: creditCardMain.id,
        alias: creditCardMain.alias,
        limit: creditCardMain.limit,
        nextClosingDate: creditCardMain.nextClosingDate,
        nextExpiringDate: creditCardMain.nextExpiringDate,
        mainCreditCardId: undefined,
        isMainCreitCard: true,
        totalSpent: creditCardMain.totalSpent,
        isEnabled: creditCardMain.isEnabled,
        createdAt: creditCardMain.createdAt,
        updatedAt: creditCardMain.updatedAt,
        expenses: [],
    };
};

export const cleanSubscriptionToForm = (subscription: Partial<Expense>): Partial<Expense> => {
    const expense: Partial<Expense> = {
        id: subscription.id,
        creditCardId: subscription.creditCardId,
        title: subscription.title,
        ccName: subscription.ccName,
        amount: subscription.amount,
        type: ExpenseTypeEnum.SUBSCRIPTION,
        status: subscription.status,
        installments: 1,
    };
    if (subscription.id) {
        expense.acquiredAt = subscription.acquiredAt;
        expense.firstPaymentDate = subscription.firstPaymentDate;
    }
    return expense;
};
export const cleanPurchaseToForm = (purchase: Partial<Expense>): Partial<Expense> => {
    return {
        id: purchase.id,
        title: purchase.title,
        ccName: purchase.ccName,
        acquiredAt: purchase.acquiredAt,
        amount: purchase.amount,
        type: ExpenseTypeEnum.PURCHASE,
        installments: purchase.installments,
        firstPaymentDate: purchase.firstPaymentDate,
        creditCardId: purchase.creditCardId,
    };
};
