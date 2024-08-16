import {
    CreditCard,
    CreditCardApiResponse,
    CCExpense,
    ExpenseApiResponse,
    ExpensePayment,
    PaymentApiResponse,
    Expense,
    ExpenseApiRequest,
    ExpenseTypeEnum,
    EditExpenseApiRequest,
    NewSubscriptionPaymentApiRequest,
    PaymentStatusEnum,
    NewSubscriptionPayment,
} from '../../types';

export const parseCreditCardFromApi = (creditCard: CreditCardApiResponse): CreditCard => {
    return {
        id: creditCard.id,
        alias: creditCard.alias,
        limit: creditCard.limit,
        nextClosingDate: creditCard.next_closing_date,
        nextExpiringDate: creditCard.next_expiring_date,
        mainCreditCardId: creditCard.main_credit_card_id,
        isMainCreitCard: !creditCard.main_credit_card_id,
        totalSpent: creditCard.total_spent,
        isEnabled: creditCard.is_enabled,
        createdAt: creditCard.created_at,
        updatedAt: creditCard.updated_at,
        expenses: creditCard.expenses.map(parseExpenseFromApi),
    };
};

export const parseExpenseFromApi = (expense: ExpenseApiResponse): CCExpense => {
    return {
        id: expense.id,
        title: expense.title,
        ccName: expense.cc_name,
        acquiredAt: expense.acquired_at,
        amount: expense.amount,
        type: expense.type,
        installments: expense.installments,
        firstPaymentDate: expense.first_payment_date,
        creditCardId: expense.credit_card_id,
        status: expense.status,
        remainingAmount: expense.remaining_amount,
        totalPaid: expense.total_paid,
        installmentsPaid: expense.installments_paid,
        installmentsPending: expense.installments_pending,
        payments: expense.payments.map(parsePaymentFromApi),
    };
};

export const parsePaymentFromApi = (payment: PaymentApiResponse): ExpensePayment => {
    return {
        id: payment.id,
        expenseId: payment.expense_id,
        status: payment.status,
        noInstallment: payment.no_installment,
        month: payment.month,
        year: payment.year,
        amount: payment.amount,
    };
};

export const parseExpenseToApi = (expense: Expense): ExpenseApiRequest => {
    return {
        title: expense.title,
        cc_name: expense.ccName,
        acquired_at: expense.acquiredAt,
        amount: expense.amount,
        type: expense.type,
        installments: expense.type === ExpenseTypeEnum.PURCHASE ? expense.noInstallments : 1,
        first_payment_date: expense.firstPaymentDate,
        credit_card_id: expense.creditCardId,
    };
};

export const parseExpenseUpdateToApi = (expense: Expense): EditExpenseApiRequest => {
    return {
        title: expense.title,
        cc_name: expense.ccName,
        acquired_at: expense.acquiredAt,
        amount: expense.amount,
        credit_card_id: expense.creditCardId,
    };
};

export const parseNewSubscriptionPaymentToApi = ({ month, year, amount }: NewSubscriptionPayment): NewSubscriptionPaymentApiRequest => {
    return {
        month,
        year,
        amount,
        status: PaymentStatusEnum.UNCONFIRMED,
    };
};
