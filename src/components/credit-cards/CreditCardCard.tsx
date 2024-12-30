import { useState } from 'react';

import { Box, Divider, IconButton, Typography } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import styled from 'styled-components';
import { enqueueSnackbar } from 'notistack';

import { CreditCard } from '../../types';
import { formatCurrency, parseDateToShortString } from '../../helpers';
import { CreditCardContainer } from './CreditCardContainer';
import { AgreeActionDialog } from '../shared';
import { useWallet } from '../../hooks';

interface Props {
    creditCard: CreditCard;
    handleOnEditClick: () => void;
}

export const CreditCardCard = ({ creditCard, handleOnEditClick }: Props) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { deleteCreditCard } = useWallet();
    const handleDelete = () => {
        try {
            deleteCreditCard(creditCard.id);
            enqueueSnackbar('Tarjeta de Crédito eliminada', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Error al eliminar tarjeta de crédito', { variant: 'error' });
        }
    };

    const onDeleteClick = () => {
        setShowDeleteDialog(true)
    }

    return (
        <CreditCardContainer>
            <Typography variant='h5' padding='0.5rem'>
                {creditCard.alias}
            </Typography>
            <Divider />
            <DataContainer>
                <Box sx={{ alignContent: 'center', flexGrow: '1' }}>
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
                    <IconButton aria-label='show' size='medium' color='info'>
                        <Visibility fontSize='inherit' />
                    </IconButton>
                    <IconButton aria-label='edit' size='medium' color='warning' onClick={handleOnEditClick}>
                        <Edit fontSize='inherit' />
                    </IconButton>
                    <IconButton aria-label='delete' size='medium' color='error' onClick={onDeleteClick}>
                        <Delete fontSize='inherit' />
                    </IconButton>
                </Box>
            </DataContainer>
            {showDeleteDialog && (
                <AgreeActionDialog
                    open={showDeleteDialog}
                    title='Confirma borrar la tarjeta de crédito?'
                    handleAgree={handleDelete}
                    handleClose={() => setShowDeleteDialog(false)}
                    description='Esta acción no se puede deshacer y burrará todos los gastos y pagos asociados a la tarjeta.'
                />
            )}
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
