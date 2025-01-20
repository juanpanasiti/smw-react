import { Box, Button, FormControl, Modal, SxProps, Theme, Typography } from '@mui/material';
import { FullPayment } from '../../../types';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

interface Props {
    handleClose: () => void;
    handleSubmit: (date: Date) => void;
    open: boolean;
    payment: FullPayment;
    sx?: SxProps<Theme>;
}

export const UpdatePaymentDateModalForm = ({ handleClose, open, payment, handleSubmit, sx = {} }: Props) => {
    const [newPaymentDate, setNewPaymentDate] = useState(new Date(payment.year, payment.month - 1, 1));
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(newPaymentDate);
    };
    const reset = () => {
        setNewPaymentDate(new Date(payment.year, payment.month - 1, 1));
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
                    {`Actualizar fecha de pago de ${payment.expenseTitle} (${payment.amount})`}
                </Typography>

                <FormControl fullWidth margin='normal'>
                    <DatePicker
                        label='Fecha de 1er pago'
                        value={dayjs(newPaymentDate)}
                        onChange={(date) => {
                            if (date && date.toDate() !== newPaymentDate) {
                                setNewPaymentDate(date?.toDate());
                            }
                        }}
                        format={DATE_FORMAT}
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

const DATE_FORMAT = 'DD-MM-YYYY';
