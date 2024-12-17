import { CreditCardList } from '../components/credit-cards';
import { useWallet } from '../hooks/useWallet';

export const ExpensesPage = () => {
    const {creditCards} = useWallet()
    return (
        <>
            <CreditCardList cards={creditCards} />
        </>
    );
};
