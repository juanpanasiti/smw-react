import { CreditCard } from '../../types';
import { CreditCardResApi, NewCreditCardReqApi } from '../../types/api';
import { parseDateFromString, parseDateToString } from '../../helpers/date.helpers';
import { NewCreditCard } from '../../types/forms';

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

export const parseCreditCardToApi = (creditCard: NewCreditCard): NewCreditCardReqApi => {
    return {
        alias: creditCard.alias,
        limit: creditCard.limit,
        main_credit_card_id: creditCard.mainCreditCardId,
        next_closing_date: creditCard.nextClosingDate ? parseDateToString(creditCard.nextClosingDate) : '',
        next_expiring_date: creditCard.nextExpiringDate  ? parseDateToString(creditCard.nextExpiringDate) : '',
    };
};
