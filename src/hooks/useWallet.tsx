import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { createCreditCardApi, deleteCreditCardApi, getCreditCardsApi, updateCreditCardApi } from '../wallet/api';
import { CreditCard, Expense, Payment } from '../wallet/api/interfaces';
import { useStore } from '../store';
import { parseCreditCardListToStore, parsePaymentListtoStore, parsePurchaseListtoStore, parseSubscriptionListtoStore } from '../store/helpers';
import { ExpenseTypeEnum } from '../wallet/enums';

const CREDIT_CARDS_QUERY_KEY = 'creditCards';
const STALE_TIME = 1000 * 60 * 60;

export const useWallet = () => {
    const { creditCards, setCreditCards, addCreditCard, deleteCreditCard, updateCreditCard } = useStore();
    const { setPurchases } = useStore();
    const { setSubscriptions } = useStore();
    const { setPayments } = useStore();

    //! Credit Cards
    const creditCardsQuery = useQuery<CreditCard[]>({
        queryKey: [CREDIT_CARDS_QUERY_KEY],
        queryFn: getCreditCardsApi,
        staleTime: STALE_TIME,
        retryOnMount: true,
        retry: false,
        refetchInterval: STALE_TIME,
    });
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

    //! Effects
    useEffect(() => {
        if (creditCardsQuery.data) {
            const creditCards: CreditCard[] = creditCardsQuery.data;
            const expenses: Expense[] = [];
            const payments: Payment[] = [];
            creditCards.forEach(cc => expenses.push(...cc.expenses));
            expenses.forEach(exp => payments.push(...exp.payments));
            setCreditCards(parseCreditCardListToStore(creditCards));
            setPurchases(parsePurchaseListtoStore(expenses.filter(exp => exp.type === ExpenseTypeEnum.PURCHASE)))
            setSubscriptions(parseSubscriptionListtoStore(expenses.filter(exp => exp.type === ExpenseTypeEnum.SUBSCRIPTION)))
            setPayments(parsePaymentListtoStore(payments))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditCardsQuery.data]);

    return {
        creditCards,
        createCreditCardMutation,
        deleteCreditCardMutation,
        updateCreditCardMutation,
    };
};
