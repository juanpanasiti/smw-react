export interface UserData {
    id: number;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    spentAlert: number;
    monthlyPaymentAlert: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthStore {
    hasFetched: boolean;
    // Properties
    userData?: UserData;

    // Methods
    setUserData: (userData: UserData) => void;
    deleteUserData: () => void;
    isLoggedIn: () => boolean;
    setFetched: () => void;
}

export interface WalletStore {
    hasInitializedData: boolean;
    creditCards: CreditCard[];
    expenses: Expense[];
    periods: Period[];

    // Credit Cards
    setCreditCards: (creditCards: CreditCard[]) => void;
    addCreditCard: (creditCard: CreditCard) => void;
    updateCreditCard: (creditCard: CreditCard) => void;
    removeCreditCard: (creditCardId: number) => void;

    // Expenses
    setExpenses: (expenses: Expense[]) => void;
    addExpense: (expense: Expense) => void;
    updateExpense: (expense: Expense) => void;
    removeExpense: (expenseId: number) => void;

    // Periods
    setPeriods: (periods: Period[]) => void;
    addPeriod: (period: Period) => void;
    updatePeriod: (period: Period) => void;
    removePeriod: (periodId: string) => void;

    // Others
    clear: () => void;
    setInitializedData: () => void;
}

export interface CreditCard {
    id: number;
    alias: string;
    limit: number;
    userId: number;
    mainCreditCardId: number;
    closingDay: Date;
    dueDay: Date;
    totalSpent: number;
    isEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Expense {
    id: number;
    title: string;
    ccName: string;
    acquiredAt: Date;
    amount: number;
    type: ExpenseTypeEnum;
    installments: number;
    firstPaymentDate: Date;
    status: ExpenseStatusEnum;
    accountId: number;
    remainingAmount: number;
    totalPaid: number;
    installmentsPaid: number;
    installmentsRemaining: number;
    createdAt: Date;
    updatedAt: Date;
    payments: Payment[];
}

export enum ExpenseTypeEnum {
    PURCHASE = 'purchase',
    SUBSCRIPTION = 'subscription',
}

export enum ExpenseStatusEnum {
    ACTIVE = 'active',
    FINISHED = 'finished',
}

export interface Period {
    id: string;
    month: number;
    year: number;
    status: PeriodStatusEnum;
    payments: Payment[];
}

export interface PeriodDictionary {
    [key: string]: Period;
}

export interface Payment {
    id: number;
    status: PaymentStatusEnum;
    amount: number;
    noInstallment: number;
    month: number;
    year: number;
    expenseId: number;
    accountId: number;
    createdAt: Date;
    updatedAt: Date;
}

export enum PaymentStatusEnum {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    PAID = 'paid',
    CANCELED = 'canceled',
    SIMULATED = 'simulated',
}

export const FINISHED_PAYMENT_STATUSES = [PaymentStatusEnum.PAID, PaymentStatusEnum.CANCELED]

export enum PeriodStatusEnum {
    PENDING = 'pending',
    DONE = 'done',
}