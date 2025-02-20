import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { CreditCard, Expense } from '../types';
import { useWalletStore } from '../store/wallet';
import { FlexContainerColumn } from '../components/shared';
import { CreditCardList } from '../components/credit-cards';
import { ExpenseList } from '../components/expenses';

export const CreditCardPage = () => {
    const { id } = useParams();
    const { getCreditCard, getExtensionCreditCards, getExpensesByCreditCardIds, hasInitializedData } = useWalletStore();
    const [creditCard, setCreditCard] = useState<CreditCard | undefined>(undefined);
    const [extensionCreditCards, setExtensionCreditCards] = useState<CreditCard[]>([]);
    const [expenses, setExpenses] = useState<Expense[]>([])
    
    const [loading, setLoading] = useState(!hasInitializedData);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (creditCard) return;
        if (!hasInitializedData) return;
        if (!id || +id < 1) {
            setLoading(false);
            setError(true);
            return;
        }

        const ccFound = getCreditCard(+id);
        if (!ccFound) {
            setLoading(false);
            setError(true);
            return;
        }

        const extensions = getExtensionCreditCards(+id)
        const creditCardIds = extensions.map((cc) => cc.id);
        creditCardIds.push(+id);

        setLoading(false);
        setError(false);
        setCreditCard(ccFound);
        setExtensionCreditCards(extensions);
        setExpenses(getExpensesByCreditCardIds(creditCardIds));
    }, [getCreditCard, getExtensionCreditCards, getExpensesByCreditCardIds, id, creditCard, hasInitializedData]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !creditCard) {
        return <div>Error</div>;
    }

    return (
        <FlexContainerColumn>
            <CreditCardList cards={[creditCard, ...extensionCreditCards]} />
            <ExpenseList expenses={expenses} />

        </FlexContainerColumn>
    );
};
