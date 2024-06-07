import { AxiosResponse } from 'axios';
import apiClient from '../../api/apiClient';
import { handleError } from '../../api/errors';
import { parseCreditCardFromApi, parseCreditCardToApi } from './helpers';
import { CreditCard, CreditCardApiReq, CreditCardApiRes } from './interfaces';

export const getCreditCardsApi = async (): Promise<CreditCard[]> => {
    try {
        const { data } = await apiClient.get<CreditCardApiRes[]>('/credit_cards');
        return data.map(parseCreditCardFromApi);
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};

export const createCreditCardApi = async (data: CreditCard): Promise<CreditCard> => {
    try {
        const { data: creditCard } = await apiClient.post<CreditCardApiRes, AxiosResponse<CreditCardApiRes>, CreditCardApiReq>(
            '/credit_cards',
            parseCreditCardToApi(data)
        );
        return parseCreditCardFromApi(creditCard);
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};

export const deleteCreditCardApi = async (id: number): Promise<boolean> => {
    try {
        await apiClient.delete(`/credit_cards/${id}`);
        return true;
    } catch (error) {
        handleError(error as Error);
        throw error;
    }
};
