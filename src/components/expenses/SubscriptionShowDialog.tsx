import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Subscription } from '../../types';


interface Props {
    handleClose: () => void;
    open: boolean;
    subscription: Subscription;
    creditCardName: string;
}
export const SubscriptionShowDialog = ({ open, handleClose, subscription, creditCardName }: Props) => {
    return (
        <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
            <DialogTitle color='primary.light' variant='h4'>
                {subscription.title} ({subscription.ccName})
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <b>Credit Card:</b> {creditCardName}
                </DialogContentText>
                <DialogContentText>
                    <b>Total Amount:</b> {subscription.amount}
                </DialogContentText>
                <DialogContentText>
                    <b>Status:</b> {subscription.status}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='warning'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
