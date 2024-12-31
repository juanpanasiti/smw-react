import { CreditCard } from '../types';
import { CreditCardResApi } from '../types/api';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { parseCreditCardFromApi, parseNewCreditCardToApi, parseUpdateCreditCardToApi } from './parsers/credit-card.parsers';
import { NewCreditCard, UpdateCreditCard } from '../types/forms';

export const callGetCreditCardListApi = async (limit: number, offset: number): Promise<CreditCard[]> => {
    const queryParams = {
        limit,
        offset,
    };
    const { data } = await apiClient.get<CreditCardResApi[]>(Endpoints.CREDIT_CARDS, { params: { ...queryParams } });
    return data.map(parseCreditCardFromApi);
};

export const getAllCreditCardsApi = async (): Promise<CreditCard[]> => {
    const limit = 100;
    let offset = 0;
    let allCreditCards: CreditCard[] = [];
    let hasMore = true;

    while (hasMore) {
        const creditCards = await callGetCreditCardListApi(limit, offset);
        allCreditCards = allCreditCards.concat(creditCards);

        hasMore = creditCards.length === limit;
        offset += limit;
    }

    return allCreditCards;
};


export const callCreateNewCreditCardApi = async (creditCardData: NewCreditCard): Promise<CreditCard> => {
    const { data } = await apiClient.post<CreditCardResApi>(Endpoints.CREDIT_CARDS, parseNewCreditCardToApi(creditCardData));
    return parseCreditCardFromApi(data);
};

export const callUpdateCreditCardApi = async (creditCardData: UpdateCreditCard, ccId: number): Promise<CreditCard> => {
    const { data } = await apiClient.patch<CreditCardResApi>(`${Endpoints.CREDIT_CARDS}/${ccId}`, parseUpdateCreditCardToApi(creditCardData));
    return parseCreditCardFromApi(data);
};

export const callDeleteCreditCardApi = async (ccId: number): Promise<void> => {
    await apiClient.delete(`${Endpoints.CREDIT_CARDS}/${ccId}`);
};
