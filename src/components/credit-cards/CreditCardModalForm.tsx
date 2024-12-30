import { Modal } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { CreditCardForm } from './forms';
import { ICreditCardForm, NewCreditCard } from '../../types/forms';
import { useWallet } from '../../hooks';

interface Props<T extends ICreditCardForm> {
    open: boolean;
    handleClose: () => void;
    card: T;
    ccId?: number;
}

export const CreditCardModalForm = <T extends ICreditCardForm>({ open, handleClose, card, ccId }: Props<T>) => {
    const { addNewCreditCard, editCreditCard } = useWallet();
    const isNew = !ccId;
    const onSubmit = async (creditCardData: NewCreditCard) => {
        if (isNew) {
            try {
                await addNewCreditCard(creditCardData);
                enqueueSnackbar('Nueva Tarjeta de Crédito agregada', { variant: 'success' });
                handleClose();
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Error al agregar nueva tarjeta de crédito', { variant: 'error' });
            }
        } else {
            try {
                await editCreditCard(creditCardData, ccId);
                enqueueSnackbar('Tarjeta de Crédito editada', { variant: 'success' });
                handleClose();
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Error al editar tarjeta de crédito', { variant: 'error' });
            }
        }
        
    };

    return (
        <Modal closeAfterTransition open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <CreditCardForm sx={style} onSubmit={(newCreditCardData) => onSubmit(newCreditCardData as NewCreditCard)} initialValues={card} isNew={isNew} />
        </Modal>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
