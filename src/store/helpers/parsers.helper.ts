import { CreditCard } from '../../wallet/api/interfaces';
import { CreditCardExtension, CreditCardMain } from '../interfaces';

export const parseCreditCardListToStore = (creditCards: CreditCard[]): CreditCardMain[] => {
    const ccMainList: CreditCardMain[] = creditCards.filter((creditCard) => creditCard.isMainCreitCard).map(parseCreditCardMainToStore);
    return ccMainList.map((main) => {
        const extensions = creditCards.filter((cc) => cc.mainCreditCardId === main.id).map(parseCreditCardExtensionToStore);
        const totalSpent = extensions.reduce((acc, curr) => acc + curr.totalSpent, 0) + main.subtotalSpent;
        return {
            ...main,
            extensions,
            totalSpent,
        };
    });
};

export const parseCreditCardMainToStore = (creditCard: CreditCard): CreditCardMain => ({
    id: creditCard.id,
    alias: creditCard.alias,
    limit: creditCard.limit,
    nextClosingDate: creditCard.nextClosingDate,
    nextExpiringDate: creditCard.nextExpiringDate,
    totalSpent: 0,
    subtotalSpent: creditCard.totalSpent,
    createdAt: creditCard.createdAt,
    updatedAt: creditCard.updatedAt,
    isEnabled: creditCard.isEnabled,
    extensions: [],
});

export const parseCreditCardExtensionToStore = (creditCard: CreditCard): CreditCardExtension => ({
    id: creditCard.id,
    alias: creditCard.alias,
    totalSpent: creditCard.totalSpent,
    createdAt: creditCard.createdAt,
    updatedAt: creditCard.updatedAt,
    isEnabled: creditCard.isEnabled,
});
