import {
    CreditCard,
    CreditCardApiReq,
    CreditCardApiRes,
    EditExpenseApiReq,
    Expense,
    ExpenseApiReq,
    ExpenseApiRes,
    Payment,
    PaymentApiRes,
} from '../interfaces';

export const parseCreditCardFromApi = (creditCardApi: CreditCardApiRes): CreditCard => {
    return {
        id: creditCardApi.id,
        alias: creditCardApi.alias,
        limit: creditCardApi.limit,
        nextClosingDate: creditCardApi.next_closing_date,
        nextExpiringDate: creditCardApi.next_expiring_date,
        mainCreditCardId: creditCardApi.main_credit_card_id,
        isMainCreitCard: !creditCardApi.main_credit_card_id,
        totalSpent: creditCardApi.total_spent,
        isEnabled: creditCardApi.is_enabled,
        createdAt: creditCardApi.created_at,
        updatedAt: creditCardApi.updated_at,
        expenses: creditCardApi.expenses.map(parseExpenseFromApi),
    };
};

export const parseExpenseFromApi = (expenseApi: ExpenseApiRes): Expense => {
    return {
        title: expenseApi.title,
        ccName: expenseApi.cc_name,
        acquiredAt: expenseApi.acquired_at,
        amount: expenseApi.amount,
        type: expenseApi.type,
        installments: expenseApi.installments,
        firstPaymentDate: expenseApi.first_payment_date,
        creditCardId: expenseApi.credit_card_id,
        id: expenseApi.id,
        status: expenseApi.status,
        remainingAmount: expenseApi.remaining_amount,
        totalPaid: expenseApi.total_paid,
        installmentsPaid: expenseApi.installments_paid,
        installmentsPending: expenseApi.installments_pending,
        payments: expenseApi.payments.map((p) => parsePaymentFromApi(p, expenseApi)),
    };
};

export const parsePaymentFromApi = (paymentApi: PaymentApiRes, expenseApi: ExpenseApiRes): Payment => ({
    id: paymentApi.id,
    expenseId: paymentApi.expense_id,
    creditCardId: expenseApi.credit_card_id,
    expenseTitle: expenseApi.title,
    expenseCcName: expenseApi.cc_name,
    expenseType: expenseApi.type,
    status: paymentApi.status,
    noInstallment: paymentApi.no_installment,
    month: paymentApi.month,
    year: paymentApi.year,
    amount: paymentApi.amount,
});

export const parseCreditCardToApi = (creditCard: CreditCard): CreditCardApiReq => {
    return {
        alias: creditCard.alias,
        limit: creditCard.limit,
        main_credit_card_id: creditCard.mainCreditCardId || null,
        user_id: 0, // TODO: Remove when API be fixed
        next_closing_date: creditCard.nextClosingDate,
        next_expiring_date: creditCard.nextExpiringDate,
        is_enabled: creditCard.isEnabled,
    };
};

export const parseNewExpenseToApi = (expenseApi: Expense): ExpenseApiReq => {
    return {
        title: expenseApi.title,
        cc_name: expenseApi.ccName,
        acquired_at: `${expenseApi.acquiredAt}`,
        amount: expenseApi.amount,
        type: expenseApi.type,
        installments: expenseApi.installments,
        first_payment_date: `${expenseApi.firstPaymentDate}`,
        credit_card_id: expenseApi.creditCardId,
    };
};
export const parseEditExpenseToApi = (expenseApi: Expense): EditExpenseApiReq => {
    return {
        title: expenseApi.title,
        cc_name: expenseApi.ccName,
        acquired_at: `${expenseApi.acquiredAt}`,
        credit_card_id: expenseApi.creditCardId,
        amount: expenseApi.amount,
    };
};
