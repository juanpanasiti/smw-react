import {
    CreditCard,
    Expense,
    ExpenseTypeEnum,
    FINISHED_PAYMENT_STATUSES,
    FullPayment,
    Payment,
    Period,
    PeriodDictionary,
    PeriodStatusEnum,
} from '../types';

export const getPeriods = (fullPaymentList: FullPayment[]): Period[] => {
    const periodsDict: PeriodDictionary = {};

    fullPaymentList.forEach((payment) => {
        const periodId = `${payment.year}-${payment.month}`;
        if (!periodsDict[periodId]) {
            periodsDict[periodId] = {
                id: periodId,
                month: payment.month,
                year: payment.year,
                status: PeriodStatusEnum.DONE,
                payments: [],
            };
        }
        periodsDict[periodId].payments.push(payment);
        if (!FINISHED_PAYMENT_STATUSES.includes(payment.status)) {
            periodsDict[periodId].status = PeriodStatusEnum.PENDING;
        }
    });
    return Object.values(periodsDict);
};

export const sortPeriods = (periods: Period[]): Period[] => {
    return periods.sort((a, b) => {
        if (a.year !== b.year) {
            return a.year - b.year;
        }
        return a.month - b.month;
    });
};

export const getFullPayment = (payment: Payment, expenses: Expense[], creditCards: CreditCard[]): FullPayment => {
    const expense = expenses.find((expense) => expense.id === payment.expenseId);
    const creditCard = creditCards.find((cc) => cc.id === payment.accountId);
    return {
        ...payment,
        expenseTitle: expense?.title || '',
        expenseCcName: expense?.ccName || '',
        expenseType: expense?.type || ExpenseTypeEnum.UNKNOWN,
        creditCardAlias: creditCard?.alias || '',
        creditCardId: creditCard?.id || 0,
    };
};
