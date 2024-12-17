import { Modal } from '@mui/material';
import { useEffect } from 'react';
import { NewCreditCardForm } from './forms';
import { useWallet } from '../../hooks/useWallet';
import { NewCreditCard } from '../../types/forms';
import { enqueueSnackbar } from 'notistack';

interface Props {
    open: boolean;
    handleClose: () => void;
}

export const CreditCardModalForm = ({ open, handleClose }: Props) => {
    useEffect(() => {
        console.log('mount');
        return () => {
            console.log('unmount');
        };
    });
    const { addNewCreditCard } = useWallet();

    const onSubmit = async (newCreditCard: NewCreditCard) => {
        try {
            await addNewCreditCard(newCreditCard)
            enqueueSnackbar('Nueva Tarjeta de Crédito agregada', { variant: 'success' });
            handleClose()
        } catch (error) {
            console.error(error)
            enqueueSnackbar('Error al agregar nueva tarjeta de crédito', { variant: 'error' });
        }
    }

    return (
        <Modal closeAfterTransition open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <NewCreditCardForm sx={style} onSubmit={onSubmit} />
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
