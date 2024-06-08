import { useEffect } from 'react';

import { useMutation, useQuery } from '@tanstack/react-query';

import { createCreditCardApi, deleteCreditCardApi, getCreditCardsApi } from '../wallet/api';
import { CreditCard } from '../wallet/api/interfaces';
import { useStore } from '../store';
import { parseCreditCardListToStore } from '../store/helpers';

const CREDIT_CARDS_QUERY_KEY = 'creditCards';
const STALE_TIME = 1000 * 60 * 60;

export const useWallet = () => {
    const { creditCards, setCreditCards, addCreditCard, deleteCreditCard } = useStore();

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
    const deleteCreditCardMutation = useMutation({
        mutationFn: deleteCreditCardApi,
        onSuccess: (...params) => deleteCreditCard(params[1]),
    });

    //! Effects
    useEffect(() => {
        if (creditCardsQuery.data) {
            setCreditCards(parseCreditCardListToStore(creditCardsQuery.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditCardsQuery.data]);

    return {
        creditCards,
        createCreditCardMutation,
        deleteCreditCardMutation
    };
};
