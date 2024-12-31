import { useState } from 'react';

import { Box, Collapse, Typography } from '@mui/material';

import { CreditCard } from '../../types';
import { CreditCardCard } from './CreditCardCard';
import { AddCreditCardButton } from './AddCreditCardButton';
import { CreditCardModalForm } from './CreditCardModalForm';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
    cards: CreditCard[];
}

export const CreditCardList = ({ cards }: Props) => {
    const [creditCardSelected, setCreditCardSelected] = useState<CreditCard | null>(null);
    const [showCreditCards, setShowCreditCards] = useState<boolean>(true);
    const toggleBoxVisibility = () => {
        setShowCreditCards((prev) => !prev);
    };

    return (
        <>
            <Typography variant='h3'>
                Tarjetas de Crédito <span onClick={toggleBoxVisibility}>{showCreditCards ? <VisibilityOff /> : <Visibility />}</span>
            </Typography>
            
            <Collapse in={showCreditCards}>
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
            </Collapse>
        </>
    );
};
