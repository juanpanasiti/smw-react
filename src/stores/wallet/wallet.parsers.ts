import {
    CCExpense,
    CreditCard,
    CreditCardExtension,
    CreditCardMain,
    CreditCardSimpleItem,
    ExpensePayment,
    ExpenseTypeEnum,
    Payment,
    PaymentStatusEnum,
    Period,
    PeriodStatusEnum,
    Purchase,
    Subscription,
} from '../../types';

export const parseCreditCardMainList = (creditCards: CreditCard[]): CreditCardMain[] => {
    const mainList: CreditCard[] = creditCards.filter((creditCard) => creditCard.isMainCreitCard);
    return mainList.map((ccm) => {
        const mainCC = parseCreditCardMain(ccm);
        mainCC.extensions = creditCards.filter((cce) => cce.mainCreditCardId === mainCC.id).map(parseCreditCardExtension);
        return mainCC;
    });
};

export const parseCreditCardMain = (creditCard: CreditCard): CreditCardMain => {
    return {
        id: creditCard.id,
        alias: creditCard.alias,
        limit: creditCard.limit,
        nextClosingDate: creditCard.nextClosingDate,
        nextExpiringDate: creditCard.nextExpiringDate,
        totalSpent: creditCard.totalSpent,
        subtotalSpent: creditCard.totalSpent,
        createdAt: creditCard.createdAt,
        updatedAt: creditCard.updatedAt,
        isEnabled: creditCard.isEnabled,
        extensions: [],
    };
};

export const parseCreditCardExtension = (creditCard: CreditCard): CreditCardExtension => {
    return {
        id: creditCard.id,
        alias: creditCard.alias,
        totalSpent: creditCard.totalSpent,
        createdAt: creditCard.createdAt,
        updatedAt: creditCard.updatedAt,
        isEnabled: creditCard.isEnabled,
    };
};

export const parseCreditCardSimpleList = (creditCards: CreditCard[]): CreditCardSimpleItem[] => {
    return creditCards.map(parseCreditCardSimple);
};

export const parseCreditCardSimple = (creditCard: CreditCard): CreditCardSimpleItem => {
    return {
        id: creditCard.id,
        alias: creditCard.alias,
        isEnabled: creditCard.isEnabled,
        nextClosingDate: creditCard.nextClosingDate,
        totalSpent: creditCard.totalSpent,
    };
};

export const parsePurchaseList = (creditCards: CreditCard[]): Purchase[] => {
    const purchases = getExpenseListByType(creditCards, ExpenseTypeEnum.PURCHASE);
    return purchases.map(parsePurchase);
};

export const parsePurchase = (purchase: CCExpense): Purchase => {
    return {
        id: purchase.id,
        creditCardId: purchase.creditCardId,
        title: purchase.title,
        ccName: purchase.ccName,
        acquiredAt: purchase.acquiredAt,
        amount: purchase.amount,
        noInstallments: purchase.payments.length,
        firstPaymentDate: purchase.firstPaymentDate,
        status: purchase.status,
        installmentsPaid: purchase.installmentsPaid,
        installmentsPending: purchase.installmentsPending,
        remainingAmount: purchase.remainingAmount,
        totalPaid: purchase.totalPaid,
    };
};

export const parseSubscriptionList = (creditCards: CreditCard[]): Subscription[] => {
    const subscriptions = getExpenseListByType(creditCards, ExpenseTypeEnum.SUBSCRIPTION);
    return subscriptions.map(parseSubscription);
};

export const parseSubscription = (subscription: CCExpense): Subscription => {
    return {
        id: subscription.id,
        creditCardId: subscription.creditCardId,
        title: subscription.title,
        ccName: subscription.ccName,
        acquiredAt: subscription.acquiredAt,
        amount: subscription.amount,
        firstPaymentDate: subscription.firstPaymentDate,
        status: subscription.status,
    };
};

export const getExpenseListByType = (creditCards: CreditCard[], type?: ExpenseTypeEnum): CCExpense[] => {
    const expenses = creditCards.flatMap((cc) => cc.expenses);
    if (!type) return expenses;
    return expenses.filter((expense) => expense.type === type);
};

export const parsePaymentList = (creditCards: CreditCard[], paymentStatuses?: PaymentStatusEnum[]): Payment[] => {
    const ccPayments: Payment[] = getExpenseListByType(creditCards)
        .map((exp) => exp.payments.map((ep) => parsePayment(ep, exp)))
        .flat();
    if (paymentStatuses === undefined || paymentStatuses.length === 0) return ccPayments;
    return ccPayments.filter((payment) => paymentStatuses.includes(payment.status));
};

export const parsePayment = (payment: ExpensePayment, expense: CCExpense): Payment => {
    return {
        id: payment.id,
        expenseId: payment.expenseId,
        creditCardId: expense.creditCardId,
        expenseTitle: expense.title,
        expenseCcName: expense.ccName,
        expenseType: expense.type,
        status: payment.status,
        noInstallment: payment.noInstallment,
        month: payment.month,
        year: payment.year,
        amount: payment.amount,
    };
};

export const getPeriods = (creditCards: CreditCard[]): Period[] => {
    type PeriodObj = { [key: string]: Period };
    const periodsObj: PeriodObj = {};

    parsePaymentList(creditCards).map((payment) => {
        const key = `${payment.month}-${payment.year}`;
        if (!periodsObj[key]) periodsObj[key] = getEmptyPeriod(key);
        periodsObj[key].status = calcPeriodStatus(periodsObj[key].status, payment.status);
        periodsObj[key].total += payment.status === PaymentStatusEnum.SIMULATED ? 0 : payment.amount;
        periodsObj[key].totalSimulated += payment.status === PaymentStatusEnum.SIMULATED ? payment.amount : 0;
        periodsObj[key].payments.push(payment);
    });

    return Object.entries(periodsObj).map(([, value]) => ({ ...value }));
};

const getEmptyPeriod = (key: string): Period => {
    const [month, year] = key.split('-');
    return {
        id: key,
        month: Number(month),
        year: Number(year),
        status: PeriodStatusEnum.PENDING,
        total: 0,
        totalSimulated: 0,
        payments: [],
    };
};

const calcPeriodStatus = (currentStatus: PeriodStatusEnum, paymentStatus: PaymentStatusEnum): PeriodStatusEnum => {
    const endingStatuses = [PaymentStatusEnum.CANCELED, PaymentStatusEnum.PAID];
    if (endingStatuses.includes(paymentStatus)) return currentStatus;
    return PeriodStatusEnum.PENDING;
};