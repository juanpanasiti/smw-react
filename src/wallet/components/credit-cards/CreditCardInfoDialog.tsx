import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { CreditCardMain } from '../../../store/interfaces';
// import { ExtensionsSimpleTable } from './extensions';

interface Props {
    handleClose: () => void;
    open: boolean;
    creditCard: CreditCardMain;
}

export const CreditCardInfoDialog = ({ handleClose, open, creditCard }: Props) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
            <DialogTitle id='alert-dialog-title'>{creditCard.alias}</DialogTitle>
            <DialogContent>
                <DialogContentText component={'div'} id='alert-dialog-description'>
                    <Typography>Replace data with total data</Typography>

                    <Divider>
                        <Typography component={'span'}>Extensions</Typography>
                    </Divider>

                    {/* <ExtensionsSimpleTable creditCard={creditCard} /> */}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='secondary'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
