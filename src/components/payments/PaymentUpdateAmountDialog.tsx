import { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, TextField } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import { Payment } from '../../types';

interface Props {
    handleClose: () => void;
    open: boolean;
    handleUpdate: (data: Partial<Payment>) => void;
    payment: Payment;
}
export const PaymentUpdateAmountDialog = ({ handleClose, open, payment, handleUpdate }: Props) => {
    const [newAmount, setNewAmount] = useState(payment.amount);
    const handleSubmit = () => {
        handleUpdate({ amount: newAmount });
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update amount</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin='dense'
                    name='amount'
                    label='New Amount'
                    type='number'
                    inputProps={{
                        step: '0.01',
                    }}
                    fullWidth
                    variant='standard'
                    defaultValue={payment.amount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AttachMoney />
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Update</Button>
            </DialogActions>
        </Dialog>
    );
};
