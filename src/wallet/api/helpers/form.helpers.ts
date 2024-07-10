import { CreditCardMain, Payment } from '../../../store/interfaces';
import { ExpenseTypeEnum } from '../../types/enums';
import { CreditCard, Expense, NewSubscriptionPayment } from '../interfaces';

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
        acquiredAt: subscription.acquiredAt,
        firstPaymentDate: subscription.firstPaymentDate,
    };
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
export const cleanPaymentToForm = (payment: Payment): NewSubscriptionPayment => {
    return {
        amount: payment.amount,
        expenseId: payment.expenseId,
        month: payment.month,
        year: payment.year,
    };
};
