import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Props {
    handleClose: () => void;
    open: boolean;
    handleAgree: () => void;
    expenseTitle: string;
}

export const ExpenseDeleteDialog = ({ handleAgree, handleClose, open, expenseTitle }: Props) => {
    const handleAgreeClick = () => {
        handleAgree();
        handleClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>Confirm delete this Expense ({expenseTitle})</DialogTitle>
            <DialogContent>
                <DialogContentText id='alert-dialog-description'>
                    This cannot be undone and will be deleted this expense, its related payments.
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
