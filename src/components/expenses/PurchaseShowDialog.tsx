import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material';

import { Purchase } from '../../types';
import { parseDate } from '../../helpers';
import { useWallet } from '../../hooks';
import { PaymentTable } from '../payments';

interface Props {
    handleClose: () => void;
    open: boolean;
    purchase: Purchase;
    creditCardName: string;
}
export const PurchaseShowDialog = ({ open, handleClose, purchase, creditCardName }: Props) => {
    const { paymentsByExpense } = useWallet();
    const payments = paymentsByExpense(purchase.id);
    console.log(payments)
    return (
        <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
            <DialogTitle color='primary.light' variant='h4'>
                {purchase.title} ({purchase.ccName})
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <b>Credit Card:</b> {creditCardName}
                </DialogContentText>
                <DialogContentText>
                    <b>Acquired At:</b> {parseDate(purchase.acquiredAt)}
                </DialogContentText>
                <DialogContentText>
                    <b>Total Amount:</b> {purchase.amount}
                </DialogContentText>
                <DialogContentText>
                    <b>Remaining Amount:</b> {purchase.remainingAmount}
                </DialogContentText>
                <DialogContentText>
                    <b>Status:</b> {purchase.status}
                </DialogContentText>
                <DialogContentText>
                    <b>First Payment Date:</b> {parseDate(purchase.firstPaymentDate)}
                </DialogContentText>
                <Divider>Payments</Divider>
                <PaymentTable payments={payments} hideTitle hidePeriod={false} />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='warning'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
