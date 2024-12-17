import { CreditCard } from '../types';
import { CreditCardResApi } from '../types/api';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { parseCreditCardFromApi, parseCreditCardToApi } from './parsers/credit-card.parsers';
import { NewCreditCard } from '../types/forms';

export const callGetCreditCardListApi = async (limit: number, offset: number): Promise<CreditCard[]> => {
    const queryParams = {
        limit,
        offset,
    };
    const { data } = await apiClient.get<CreditCardResApi[]>(Endpoints.CREDIT_CARDS, { params: { queryParams } });
    return data.map(parseCreditCardFromApi);
};

export const callCreateNewCreditCardApi = async (creditCardData: NewCreditCard): Promise<CreditCard> => {
    const { data } = await apiClient.post<CreditCardResApi>(Endpoints.CREDIT_CARDS, parseCreditCardToApi(creditCardData));

    return parseCreditCardFromApi(data);
};
