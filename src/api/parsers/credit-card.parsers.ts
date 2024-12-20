import { CreditCard } from '../../types';
import { CreditCardResApi, NewCreditCardReqApi, UpdateCreditCardReqApi } from '../../types/api';
import { parseDateFromString, parseDateToString } from '../../helpers/date.helpers';
import { NewCreditCard, UpdateCreditCard } from '../../types/forms';

export const parseCreditCardFromApi = (creditCard: CreditCardResApi): CreditCard => {
    return {
        id: creditCard.id,
        alias: creditCard.alias,
        limit: creditCard.limit,
        userId: creditCard.user_id,
        mainCreditCardId: creditCard.main_credit_card_id,
        closingDay: parseDateFromString(creditCard.next_closing_date),
        dueDay: parseDateFromString(creditCard.next_expiring_date),
        totalSpent: creditCard.total_spent,
        isEnabled: creditCard.is_enabled,
        createdAt: parseDateFromString(creditCard.created_at),
        updatedAt: parseDateFromString(creditCard.updated_at),
    };
};

export const parseNewCreditCardToApi = (creditCard: NewCreditCard): NewCreditCardReqApi => {
    return {
        alias: creditCard.alias,
        limit: creditCard.limit,
        main_credit_card_id: creditCard.mainCreditCardId,
        next_closing_date: creditCard.nextClosingDate ? parseDateToString(creditCard.nextClosingDate) : '',
        next_expiring_date: creditCard.nextExpiringDate  ? parseDateToString(creditCard.nextExpiringDate) : '',
    };
};

export const parseUpdateCreditCardToApi = (creditCard: UpdateCreditCard): UpdateCreditCardReqApi => {
    const response: UpdateCreditCardReqApi = {};
    if (creditCard.alias) response['alias'] = creditCard.alias
    if (creditCard.limit) response['limit'] = creditCard.limit
    if (creditCard.mainCreditCardId) response['main_credit_card_id'] = creditCard.mainCreditCardId
    if (creditCard.nextClosingDate) response['next_closing_date'] = parseDateToString(creditCard.nextClosingDate)
    if (creditCard.nextExpiringDate) response['next_expiring_date'] = parseDateToString(creditCard.nextExpiringDate)

    return response;
};
