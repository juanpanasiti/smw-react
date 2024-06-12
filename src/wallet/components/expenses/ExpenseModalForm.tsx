import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';
import { ExpenseForm } from '.';
import { Purchase, Subscription } from '../../../store/interfaces';

interface Props {
    open: boolean;
    handleOpen: () => void;
    style?: SxProps<Theme>;
    purchase?: Purchase;
    subscription?: Subscription;
}

export const ExpenseModalForm = ({ open, handleOpen, style = {}, purchase, subscription }: Props) => {
    const defaultStyle: SxProps<Theme> = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const getTitle = () => {
        if (purchase) {
            return `Edit ${purchase.title}`;
        } else if (subscription) {
            return `Edit ${subscription.title}`;
        } else {
            return 'New Expense';
        }
    };
    return (
        <Modal open={open} onClose={handleOpen} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={{ ...defaultStyle, ...style }}>
                <Typography id='modal-modal-title' variant='h5'>
                    {getTitle()}
                </Typography>
                <ExpenseForm purchase={purchase} subscription={subscription} afterSubmit={handleOpen} />
            </Box>
        </Modal>
    );
};
