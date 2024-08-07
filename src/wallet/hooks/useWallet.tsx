import { useEffect, useState } from 'react';

import { useStore } from '../../store';
import {
    createCreditCardApi,
    createExpenseApi,
    deleteCreditCardApi,
    deleteExpenseApi,
    getCreditCardsApi,
    updateCreditCardApi,
    updateExpenseApi,
} from '../api';
import { CreditCard, Expense, NewSubscriptionPayment, Payment } from '../api/interfaces';
import { CreditCardSimpleItem } from '../../store/interfaces';
import {
    parseCreditCardListToStore,
    parsePaymentListtoStore,
    parsePaymentToStore,
    parsePurchaseListtoStore,
    parsePurchaseToStore,
    parseSubscriptionListtoStore,
    parseSubscriptionToStore,
} from '../../store/helpers';
import { ExpenseTypeEnum } from '../types/enums';
import { createSubscriptionPaymentApi, updatePaymentAmountApi, updatePaymentStatusApi } from '../api/payments.api';

export const useWallet = () => {
    const creditCards = useStore((state) => state.creditCards);
    const setCreditCards = useStore((state) => state.setCreditCards);
    const addCreditCard = useStore((state) => state.addCreditCard);
    const deleteCreditCard = useStore((state) => state.deleteCreditCard);
    const updateCreditCard = useStore((state) => state.updateCreditCard);
    const purchases = useStore((state) => state.purchases);
    const setPurchases = useStore((state) => state.setPurchases);
    const addPurchase = useStore((state) => state.addPurchase);
    const updatePurchase = useStore((state) => state.updatePurchase);
    const deletePurchase = useStore((state) => state.deletePurchase);
    const subscriptions = useStore((state) => state.subscriptions);
    const setSubscriptions = useStore((state) => state.setSubscriptions);
    const addSubscription = useStore((state) => state.addSubscription);
    const updateSubscription = useStore((state) => state.updateSubscription);
    const deleteSubscription = useStore((state) => state.deleteSubscription);
    const payments = useStore((state) => state.payments);
    const setPayments = useStore((state) => state.setPayments);
    const addPayment = useStore((state) => state.addPayment);
    const updatePayment = useStore((state) => state.updatePayment);

    //! Credit Cards
    const [simpleCreditCards, setSimpleCreditCards] = useState<CreditCardSimpleItem[]>([]);
    const createNewCreditCard = async (creditCard: CreditCard) => {
        try {
            const newCreditCard = await createCreditCardApi(creditCard);
            addCreditCard(newCreditCard);
        } catch (error) {
            alert(`Error creating`);
        }
    };
    const updateOneCreditCard = async (creditCard: CreditCard) => {
        try {
            const updatedCreditCard = await updateCreditCardApi(creditCard);
            updateCreditCard(updatedCreditCard);
        } catch (error) {
            alert(`Error creating`);
        }
    };
    const deleteCreditCardById = async (id: number) => {
        try {
            await deleteCreditCardApi(id);
            deleteCreditCard(id);
        } catch (error) {
            alert(`Delete credit card #${id}`);
        }
    };

    //! Expenses
    const createNewExpense = async (expense: Expense) => {
        try {
            const newExpense = await createExpenseApi(expense);
            newExpense.type === ExpenseTypeEnum.PURCHASE
                ? addPurchase(parsePurchaseToStore(newExpense))
                : addSubscription(parseSubscriptionToStore(newExpense));
        } catch (error) {
            alert(`Error creating`);
        }
    };
    const updateOneExpense = async (expense: Expense) => {
        try {
            const updatedExpense = await updateExpenseApi(expense);
            updatedExpense.type === ExpenseTypeEnum.PURCHASE
                ? updatePurchase(parsePurchaseToStore(updatedExpense))
                : updateSubscription(parseSubscriptionToStore(updatedExpense));
        } catch (error) {
            alert(`Error updating`);
        }
    };
    const deleteExpenseById = async (id: number, expenseType: ExpenseTypeEnum) => {
        try {
            await deleteExpenseApi(id);
            expenseType === ExpenseTypeEnum.PURCHASE ? deletePurchase(id) : deleteSubscription(id);
        } catch (error) {
            alert(`Error deleting`);
        }
    };

    //! Purchases
    //! Subscriptions
    //! Payments
    const createNewSubscriptionPayment = async (payment: NewSubscriptionPayment) => {
        try {
            const newPayment = await createSubscriptionPaymentApi(payment);
            addPayment(parsePaymentToStore(newPayment));
        } catch (error) {
            alert(`Error creating`);
        }
    };
    const updatePaymentStatus = async (payment: Payment) => {
        try {
            await updatePaymentStatusApi(payment);
            updatePayment(payment);
        } catch (error) {
            alert(`Error updating status`);
        }
    };
    const updatePaymentAmount = async (payment: Payment) => {
        try {
            await updatePaymentAmountApi(payment);
            updatePayment(payment);
        } catch (error) {
            alert(`Error updating amount`);
        }
    };
    const filterPaymentsByExpenseId = (expenseId: number): Payment[] => {
        return payments.filter((payment) => payment.expenseId === expenseId);
    };

    //! Effects
    useEffect(() => {
        (async () => {
            const creditCardsList = await getCreditCardsApi();
            const expenses: Expense[] = [];
            const payments: Payment[] = [];
            if (creditCardsList) {
                const simpleCreditCards: CreditCardSimpleItem[] = [];
                creditCardsList.forEach((cc) => {
                    expenses.push(...cc.expenses);
                    simpleCreditCards.push({
                        id: cc.id,
                        alias: cc.alias,
                        isEnabled: cc.isEnabled,
                        nextClosingDate: cc.nextClosingDate,
                        totalSpent: cc.totalSpent,
                    });
                });
                expenses.forEach((exp) => payments.push(...exp.payments));
                setCreditCards(parseCreditCardListToStore(creditCardsList));
                setSimpleCreditCards(simpleCreditCards);
                setPurchases(parsePurchaseListtoStore(expenses.filter((exp) => exp.type === ExpenseTypeEnum.PURCHASE)));
                setSubscriptions(parseSubscriptionListtoStore(expenses.filter((exp) => exp.type === ExpenseTypeEnum.SUBSCRIPTION)));
                setPayments(parsePaymentListtoStore(payments));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        // Credit Cards
        creditCards,
        simpleCreditCards,
        createNewCreditCard,
        updateOneCreditCard,
        deleteCreditCardById,
        // Expenses
        createNewExpense,
        updateOneExpense,
        deleteExpenseById,
        // Purchases
        purchases,
        // Subscriptions
        subscriptions,
        // Payments
        payments,
        createNewSubscriptionPayment,
        updatePaymentAmount,
        updatePaymentStatus,
        filterPaymentsByExpenseId,
    };
};
