import { useEffect, useState } from 'react';
import { Purchase, Subscription } from '../../store/interfaces';
import { ExpenseTypeEnum } from '../types/enums';

interface Props {
    originalPurchases: Purchase[];
    originalSubscriptions: Subscription[];
}
export const useFilterExpenses = ({ originalPurchases, originalSubscriptions }: Props) => {
    const [filteredPurchses, setFilteredPurchses] = useState<Purchase[]>(originalPurchases);
    const [filteredSubscriptions, setFilteredSubscriptions] = useState<Subscription[]>(originalSubscriptions);
    const [textFilter, setTextFilter] = useState<string>('');
    const [creditCardId, setCreditCardId] = useState<number | undefined>(undefined);
    const [expenseType, setExpenseType] = useState<ExpenseTypeEnum | 'any'>('any');

    useEffect(() => {
        const filtered = originalPurchases.filter((purchase: Purchase) => {
            return (
                (expenseType === 'any' || expenseType === ExpenseTypeEnum.SUBSCRIPTION) &&
                checkFilter({ expense: purchase, creditCardId, textFilter })
            );
        });
        setFilteredPurchses(filtered);
    }, [originalPurchases, textFilter, creditCardId, expenseType]);

    useEffect(() => {
        const filtered = originalSubscriptions.filter((subscription: Subscription) => {
            return (
                (expenseType === 'any' || expenseType === ExpenseTypeEnum.SUBSCRIPTION) &&
                checkFilter({ expense: subscription, creditCardId, textFilter })
            );
        });
        setFilteredSubscriptions(filtered);
    }, [originalSubscriptions, textFilter, creditCardId, expenseType]);

    return {
        filteredPurchses,
		filteredSubscriptions,
        textFilter,
        creditCardId,
        expenseType,
        setTextFilter,
        setCreditCardId,
        setExpenseType,
    };
};
interface CheckFilterProps {
    expense: Subscription | Purchase;
    creditCardId: number | undefined;
    textFilter: string;
}
const checkFilter = ({ expense, creditCardId, textFilter }: CheckFilterProps): boolean => {
    return (
        (!creditCardId || expense.creditCardId === creditCardId) &&
        (expense.title.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()) ||
            expense.ccName.toLocaleLowerCase().includes(textFilter.toLocaleLowerCase()))
    );
};
