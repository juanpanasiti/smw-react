import { Box } from '@mui/material';

import { CreditCard } from '../../types';
import { CreditCardCard } from './CreditCardCard';
import { AddCreditCardButton } from './AddCreditCardButton';

interface Props {
    cards: CreditCard[];
}

export const CreditCardList = ({ cards }: Props) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
            }}
        >
            {cards.map((card) => (
                <CreditCardCard key={card.id} creditCard={card} />
            ))}
            <AddCreditCardButton />
        </Box>
    );
};
