import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { CreditCard } from '../../types';
import { CreditCardCard } from './CreditCardCard';
import { AddCreditCardButton } from './AddCreditCardButton';
import { CreditCardModalForm } from './CreditCardModalForm';

interface Props {
    cards: CreditCard[];
}

export const CreditCardList = ({ cards }: Props) => {
    const [creditCardSelected, setCreditCardSelected] = useState<CreditCard | null>(null);
    return (
        <>
            <Typography variant='h2'>Tarjetas de Crédito</Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}
            >
                {cards.map((card) => (
                    <CreditCardCard key={card.id} creditCard={card} handleOnEditClick={() => setCreditCardSelected(card)} />
                ))}
                <AddCreditCardButton />
                {creditCardSelected && (
                    <CreditCardModalForm
                        open={!!creditCardSelected}
                        handleClose={() => setCreditCardSelected(null)}
                        card={creditCardSelected}
                        ccId={creditCardSelected.id}
                    />
                )}
            </Box>
        </>
    );
};
