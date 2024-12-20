import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';

interface Props {
    handleAgree: () => void;
    handleDisagree?: () => void;
    handleClose: () => void;
    open: boolean;
    title: string;
    description?: string;
}
export const AgreeActionDialog = ({ handleAgree, handleClose, handleDisagree, open, title, description }: Props) => {
    const handleAgreeAction = () => {
        handleAgree();
        handleClose();
    };
    const handleDisagreeAction = () => {
        if (handleDisagree) handleDisagree();
        handleClose();
    };
    return (
        <Dialog
            open={open}
            //  TransitionComponent={Transition}
            onClose={handleClose}
        >
            <DialogTitle>{title}</DialogTitle>
            {description && (
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
            )}
            <DialogActions>
                <IconButton color='error' aria-label='add an alarm' onClick={handleDisagreeAction}>
                    <ThumbDown />
                </IconButton>
                <IconButton color='success' aria-label='add an alarm' onClick={handleAgreeAction}>
                    <ThumbUp />
                </IconButton>
            </DialogActions>
        </Dialog>
    );
};
