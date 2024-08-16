import { ExpenseStatusEnum, ExpenseTypeEnum, PaymentStatusEnum, PeriodStatusEnum } from './api.enums';

export interface WalletStore {
    walletData?: CreditCard[];
    creditCards: {
        fullList: CreditCardMain[];
        mainList: CreditCardMain[];
        simpleList: CreditCardSimpleItem[];
    };
    expenses: {
        purchases: Purchase[];
        subscriptions: Subscription[];
    };
    payments: {
        fullList: Payment[];
        pendingList: Payment[];
        doneList: Payment[];
        byPeriod: Period[];
    };

    setWalletData: (walletData: CreditCard[]) => void;
    clearData: () => void;
    addExpense: (expense: CCExpense) => void;
    modifyExpense: (expense: CCExpense) => void;
    removeExpense: (creditCardId: number, expenseId: number) => void;

    updateCreditCard: () => void;
    modifyPayment: (creditCardId: number, payment: ExpensePayment) => void;
}

export interface CreditCard {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: string;
    nextExpiringDate: string;
    mainCreditCardId?: number;
    isMainCreitCard: boolean;
    totalSpent: number;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    expenses: CCExpense[];
}

export interface CCExpense {
    id: number;
    title: string;
    ccName: string;
    acquiredAt: string;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    firstPaymentDate: string;
    creditCardId: number;
    status: ExpenseStatusEnum;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
    payments: ExpensePayment[];
}

export interface ExpensePayment {
    id: number;
    expenseId: number;
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}

export interface CreditCardMain {
    id: number;
    alias: string;
    limit: number;
    nextClosingDate: string;
    nextExpiringDate: string;
    totalSpent: number;
    subtotalSpent: number;
    createdAt: string;
    updatedAt: string;
    isEnabled: boolean;
    extensions: CreditCardExtension[];
}

export interface CreditCardExtension {
    id: number;
    alias: string;
    totalSpent: number;
    createdAt: string;
    updatedAt: string;
    isEnabled: boolean;
}

export interface CreditCardSimpleItem {
    id: number;
    alias: string;
    isEnabled: boolean;
    nextClosingDate?: string;
    totalSpent?: number;
}

export interface Purchase {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    acquiredAt: string;
    amount: number;
    noInstallments: number;
    firstPaymentDate: string;
    status: ExpenseStatusEnum;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsPending: number;
}

export interface Subscription {
    id: number;
    creditCardId: number;
    title: string;
    ccName: string;
    amount: number;
    status: ExpenseStatusEnum;
    acquiredAt: string;
    firstPaymentDate: string;
}

export interface Expense extends Purchase, Subscription {
    type: ExpenseTypeEnum;
}

export interface Payment {
    id: number;
    expenseId: number;
    creditCardId: number;
    expenseTitle: string;
    expenseCcName: string;
    expenseType: ExpenseTypeEnum;
    status: PaymentStatusEnum;
    noInstallment: number;
    month: number;
    year: number;
    amount: number;
}

export interface Period {
    id: string;
    month: number;
    year: number;
    status: PeriodStatusEnum;
    total: number;
    totalSimulated: number;
    payments: Payment[];
}
