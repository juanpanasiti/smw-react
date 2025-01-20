import { Box, Button, FormControl, Modal, SxProps, TextField, Theme, Typography } from '@mui/material';
import { FullPayment } from '../../../types';
import { useState } from 'react';

interface Props {
    handleClose: () => void;
    handleSubmit: (amount: number) => void;
    open: boolean;
    payment: FullPayment;
    sx?: SxProps<Theme>;
}

export const UpdateAmountModalForm = ({ handleClose, open, payment, handleSubmit, sx = {} }: Props) => {
    const [newAmount, setNewAmount] = useState(payment.amount);
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(newAmount);
    };
    const reset = () => {
        setNewAmount(payment.amount);
    };
    return (
        <Modal
            closeAfterTransition
            open={open}
            onClose={handleClose}
            aria-labelledby='payment-modal-title'
            aria-describedby='payment-modal-description'
            sx={{
                maxWidth: '600px',
                alignSelf: 'center',
                margin: 'auto',
            }}
        >
            <Box component='form' onSubmit={onSubmit} sx={{ ...containerProps, ...sx }}>
                <Typography variant='h4' gutterBottom>
                    {`Actualizar monto de ${payment.expenseTitle} (${payment.amount})`}
                </Typography>

                <FormControl fullWidth sx={{ m: 1 }}>
                    <TextField
                        fullWidth
                        label='Monto'
                        type='number'
                        slotProps={{
                            htmlInput: {
                                step: '0.01',
                                min: 0,
                                defaultValue: 0,
                            },
                        }}
                        value={newAmount}
                        autoComplete='off'
                        onChange={(e) => setNewAmount(+e.target.value)}
                        margin='normal'
                        required
                    />
                </FormControl>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='submit' variant='contained' color='primary'>
                        Guardar
                    </Button>
                    <Button type='button' variant='outlined' color='secondary' onClick={reset}>
                        Limpiar
                    </Button>
                </Box>
            </Box>
            
        </Modal>
    );
};
const containerProps = {
    mx: 'auto',
    mt: 5,
    p: 3,
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 3,
};
  