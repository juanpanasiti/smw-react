import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Props {
    handleClose: () => void;
    open: boolean;
    handleAgree: () => void;
    creditCardName: string;
}
export const CreditCardDeleteDialog = ({ handleAgree, handleClose, open, creditCardName }: Props) => {
    const handleAgreeClick = () => {
        handleAgree();
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>Confirm delete this Credir Card ({creditCardName})</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    This cannot be undone and will be deleted this credit card, its extensions and all the expenses and payments related.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAgreeClick} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};
