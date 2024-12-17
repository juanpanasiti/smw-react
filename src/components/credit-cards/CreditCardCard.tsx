import { Box, Divider, IconButton, Typography } from '@mui/material';
import { CreditCard } from '../../types';
import styled from 'styled-components';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { formatCurrency, parseDateToShortString } from '../../helpers';
import { CreditCardContainer } from './CreditCardContainer';

interface Props {
    creditCard: CreditCard;
}

export const CreditCardCard = ({ creditCard }: Props) => {
    return (
        <CreditCardContainer>
            <Typography variant='h5' padding='0.5rem'>{creditCard.alias}</Typography>
            <Divider />
            <DataContainer>
                <Box sx={{alignContent:'center', flexGrow:'1'}}>
                    <DatesContainer>
                        <Typography variant='body1'>
                            <b>Cierre:</b> {parseDateToShortString(creditCard.closingDay)}
                        </Typography>
                        <Typography variant='body1'>
                            <b>Vence:</b> {parseDateToShortString(creditCard.dueDay)}
                        </Typography>
                    </DatesContainer>
                    <AmountsContainer>
                        <Typography variant='body1'>
                            <b>Próximo</b> {formatCurrency(creditCard.totalSpent)}
                        </Typography>
                        <Typography variant='body1'>
                            <b>Monto últ. ctas</b> {formatCurrency(creditCard.totalSpent)}
                        </Typography>
                    </AmountsContainer>
                </Box>
                <Box sx={{ width: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                    <IconButton aria-label='delete' size='medium' color='info'>
                        <Visibility fontSize='inherit' />
                    </IconButton>
                    <IconButton aria-label='delete' size='medium' color='warning'>
                        <Edit fontSize='inherit' />
                    </IconButton>
                    <IconButton aria-label='delete' size='medium' color='error'>
                        <Delete fontSize='inherit' />
                    </IconButton>
                </Box>
            </DataContainer>
        </CreditCardContainer>
    );
};

const DataContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 0.5rem;
`;

const DatesContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 0.5rem;
`;

const AmountsContainer = styled.div`
    display: flex;
    gap: 20px;
    padding: 0.5rem;
`;
