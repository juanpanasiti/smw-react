import { useEffect, useRef, useState } from 'react';
import { ExpenseTypeEnum, Purchase, Subscription } from '../types';

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
    const qPurchasesRef = useRef(originalPurchases.length);
    const qSubscriptionsRef = useRef(originalSubscriptions.length);
    const filterChangeRef = useRef(false);


    useEffect(() => {
        if (originalPurchases.length === 0) return;    
        const filtered = originalPurchases.filter((purchase: Purchase) => {
            return (
                (expenseType === 'any' || expenseType === ExpenseTypeEnum.PURCHASE) &&
                checkFilter({ expense: purchase, creditCardId, textFilter })
            );
        });

        (filterChangeRef.current) && setFilteredPurchses(filtered)
        qPurchasesRef.current = originalPurchases.length;
        filterChangeRef.current = false;
    }, [originalPurchases, textFilter, creditCardId, expenseType]);

    useEffect(() => {
        if (originalSubscriptions.length === 0) return;
        const filtered = originalSubscriptions.filter((subscription: Subscription) => {
            return (
                (expenseType === 'any' || expenseType === ExpenseTypeEnum.SUBSCRIPTION) &&
                checkFilter({ expense: subscription, creditCardId, textFilter })
            );
        });
        (filterChangeRef.current || (qSubscriptionsRef.current !== originalSubscriptions.length)) && setFilteredSubscriptions(filtered);
        qSubscriptionsRef.current = originalSubscriptions.length
        filterChangeRef.current = false;
    }, [originalSubscriptions, textFilter, creditCardId, expenseType]);

    useEffect(() => {
        filterChangeRef.current = true;
    }, [textFilter, creditCardId, expenseType]);

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
