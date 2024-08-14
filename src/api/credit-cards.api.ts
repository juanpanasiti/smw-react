import { CreditCard, CreditCardApiResponse } from '../types';
import apiClient from './apiClient';
import { Endpoints } from './enums';
import { parseCreditCardFromApi } from './parsers';

export const callGetCreditCardsApi = async (): Promise<CreditCard[]> => {
    const { data } = await apiClient.get<CreditCardApiResponse[]>(Endpoints.CREDIT_CARDS);
    return data.map(parseCreditCardFromApi);
};
