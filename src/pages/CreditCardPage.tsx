import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { CreditCard } from '../types';
import { useWalletStore } from '../store/wallet';

export const CreditCardPage = () => {
    const { id } = useParams();
    const { getCreditCard } = useWalletStore();
    const [creditCard, setCreditCard] = useState<CreditCard | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (creditCard) return;
        if (!id || +id < 1) {
            setLoading(false);
            setError(true);
            console.log('error por no id');
            return;
        }

        const ccFound = getCreditCard(+id);
        console.log(ccFound);

        if (!ccFound) {
            setLoading(false);
            setError(true);
            console.log('error por no cc');
            return;
        }

        setLoading(false);
        setError(false)
        setCreditCard(ccFound);
    }, [getCreditCard, id, creditCard]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error</div>;
    }

    return <div>Credit card {creditCard?.alias}</div>;
};
