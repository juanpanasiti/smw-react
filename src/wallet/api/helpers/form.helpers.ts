import { CreditCardMain } from "../../../store/interfaces"
import { CreditCard } from "../interfaces"

export const parseCreditCardMainToForm = (creditCardMain: CreditCardMain): CreditCard => {
    return {
        id: creditCardMain.id,
        alias: creditCardMain.alias,
        limit: creditCardMain.limit,
        nextClosingDate: creditCardMain.nextClosingDate,
        nextExpiringDate: creditCardMain.nextExpiringDate,
        mainCreditCardId: undefined,
        isMainCreitCard: true,
        totalSpent: creditCardMain.totalSpent,
        isEnabled: creditCardMain.isEnabled,
        createdAt: creditCardMain.createdAt,
        updatedAt: creditCardMain.updatedAt,
        expenses: [],
    }
}