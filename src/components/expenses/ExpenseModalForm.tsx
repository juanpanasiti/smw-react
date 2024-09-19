import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';

// import { ExpenseForm } from './ExpenseForm';
import { Expense, ExpenseTypeEnum, Purchase, Subscription } from '../../types';
import { useState } from 'react';
import { Switch } from '../common';
import { ExpenseForm } from './ExpenseForm';

interface Props {
    open: boolean;
    handleOpen: () => void;
    style?: SxProps<Theme>;
    purchase?: Purchase;
    subscription?: Subscription;
}

export const ExpenseModalForm = ({ open, handleOpen, style = {}, purchase, subscription }: Props) => {
    const [expenseType, setExpenseType] = useState<ExpenseTypeEnum>(getExpenseType(subscription));
    const isNew = !(purchase || subscription);
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
    const handleToggle = () => {
        setExpenseType(expenseType === ExpenseTypeEnum.PURCHASE ? ExpenseTypeEnum.SUBSCRIPTION : ExpenseTypeEnum.PURCHASE);
    };
    const parseExpense = ():Expense | undefined => {
        if(isNew) return undefined;
        const expense =  purchase || subscription;
        return {
            ...expense,
            type: expenseType,
        } as Expense
    }
    const handleClose = () => {
        handleOpen()
        setExpenseType(getExpenseType(subscription))
    }
    return (
        <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
            <Box sx={{ ...defaultStyle, ...style }}>
                <Typography id='modal-modal-title' variant='h5'>
                    {getTitle()}
                </Typography>

                {isNew && <Switch leftLabel='Subscription' rightLabel='Purchase' handleToggle={handleToggle} />}
                <ExpenseForm expenseType={expenseType} afterSuccess={() => handleClose()} expense={parseExpense()} />
            </Box>
        </Modal>
    );
};

const getExpenseType = (subscription?: Subscription) => {
    if (subscription) {
        return ExpenseTypeEnum.SUBSCRIPTION;
    }
    return ExpenseTypeEnum.PURCHASE;
};
