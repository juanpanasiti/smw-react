import { useEffect, useState } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
    createCreditCardApi,
    createExpenseApi,
    deleteCreditCardApi,
    deleteExpenseApi,
    getCreditCardsApi,
    updateCreditCardApi,
    updateExpenseApi,
} from '../wallet/api';
import { CreditCard, Expense, Payment } from '../wallet/api/interfaces';
import { useStore } from '../store';
import {
    parseCreditCardListToStore,
    parsePaymentListtoStore,
    parsePaymentToStore,
    parsePurchaseListtoStore,
    parsePurchaseToStore,
    parseSubscriptionListtoStore,
    parseSubscriptionToStore,
} from '../store/helpers';
import { ExpenseTypeEnum } from '../wallet/types/enums';
import { CreditCardSimpleItem } from '../store/interfaces';
import { createSubscriptionPaymentApi, updatePaymentAmountApi, updatePaymentStatusApi } from '../wallet/api/payments.api';

const CREDIT_CARDS_QUERY_KEY = 'creditCards';
const STALE_TIME = 1000 * 60 * 60;

export const useWallet = () => {
    const { creditCards, setCreditCards, addCreditCard, deleteCreditCard, updateCreditCard } = useStore();
    const { purchases, setPurchases, addPurchase, updatePurchase, deletePurchase } = useStore();
    const { subscriptions, setSubscriptions, addSubscription, updateSubscription, deleteSubscription } = useStore();
    const { payments, setPayments, addPayment, updatePayment } = useStore();

    //! Credit Cards
    const creditCardsQuery = useQuery<CreditCard[]>({
        queryKey: [CREDIT_CARDS_QUERY_KEY],
        queryFn: getCreditCardsApi,
        staleTime: STALE_TIME,
        retryOnMount: true,
        retry: false,
        refetchInterval: STALE_TIME,
    });
    const [simpleCreditCards, setSimpleCreditCards] = useState<CreditCardSimpleItem[]>([]);
    const createCreditCardMutation = useMutation({
        mutationFn: createCreditCardApi,
        onSuccess: (creditCard) => addCreditCard(creditCard),
    });
    const updateCreditCardMutation = useMutation({
        mutationFn: updateCreditCardApi,
        onSuccess: (creditCard) => updateCreditCard(creditCard),
    });
    const deleteCreditCardMutation = useMutation({
        mutationFn: deleteCreditCardApi,
        onSuccess: (...params) => deleteCreditCard(params[1]),
    });
    //! Expenses
    const createExpenseMutation = useMutation({
        mutationFn: createExpenseApi,
        onSuccess: (data) =>
            data.type === ExpenseTypeEnum.PURCHASE ? addPurchase(parsePurchaseToStore(data)) : addSubscription(parseSubscriptionToStore(data)),
    });
    const updateExpenseMutation = useMutation({
        mutationFn: updateExpenseApi,
        onSuccess: (data) =>
            data.type === ExpenseTypeEnum.PURCHASE ? updatePurchase(parsePurchaseToStore(data)) : updateSubscription(parseSubscriptionToStore(data)),
    });
    const deleteExpenseMutation = useMutation({
        mutationFn: (data: Expense) => deleteExpenseApi(data.id),
        onSuccess: (...params) => (params[1].type === ExpenseTypeEnum.PURCHASE ? deletePurchase(params[1].id) : deleteSubscription(params[1].id)),
    });
    //! Payments
    const createSubscriptionPaymentMutation = useMutation({
        mutationFn: createSubscriptionPaymentApi,
        onSuccess: (data) => addPayment(parsePaymentToStore(data)),
    });
    const updatePaymentStatusMutation = useMutation({
        mutationFn: updatePaymentStatusApi,
        onSuccess: (...params) => updatePayment(params[1]),
    });
    const updatePaymentAmountMutation = useMutation({
        mutationFn: updatePaymentAmountApi,
        onSuccess: (...params) => updatePayment(params[1]), // TODO: Invalidate others payments data
    });

    //! Effects
    useEffect(() => {
        if (creditCardsQuery.data) {
            const creditCards: CreditCard[] = creditCardsQuery.data;
            const simpleCreditCards: CreditCardSimpleItem[] = [];
            const expenses: Expense[] = [];
            const payments: Payment[] = [];
            creditCards.forEach((cc) => {
                expenses.push(...cc.expenses);
                simpleCreditCards.push({
                    id: cc.id,
                    alias: cc.alias,
                    isEnabled: cc.isEnabled,
                    nextClosingDate: cc.nextClosingDate,
                });
            });
            expenses.forEach((exp) => payments.push(...exp.payments));
            setCreditCards(parseCreditCardListToStore(creditCards));
            setSimpleCreditCards(simpleCreditCards);
            setPurchases(parsePurchaseListtoStore(expenses.filter((exp) => exp.type === ExpenseTypeEnum.PURCHASE)));
            setSubscriptions(parseSubscriptionListtoStore(expenses.filter((exp) => exp.type === ExpenseTypeEnum.SUBSCRIPTION)));
            setPayments(parsePaymentListtoStore(payments));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditCardsQuery.data]);

    return {
        // Credit Cards
        creditCards,
        simpleCreditCards,
        createCreditCardMutation,
        deleteCreditCardMutation,
        updateCreditCardMutation,
        // Expenses
        createExpenseMutation,
        updateExpenseMutation,
        deleteExpenseMutation,
        // Purchases
        purchases,
        // Subscriptions
        subscriptions,
        // Payments
        payments,
        updatePaymentStatusMutation,
        updatePaymentAmountMutation,
        createSubscriptionPaymentMutation,
    };
};
