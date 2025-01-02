import { Modal } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { IExpenseForm } from '../../types/forms';
import { ExpenseForm } from './forms';
import { useWallet } from '../../hooks';

interface Props<T extends IExpenseForm> {
    open: boolean;
    handleClose: () => void;
    expense: T;
    expenseId?: number;
}

export const ExpenseModalForm = <T extends IExpenseForm>({ open, handleClose, expense, expenseId }: Props<T>) => {
    const { addNewExpense, editExpense } = useWallet()
    const isNew = !expenseId;
    const onSubmit = async (expenseData: IExpenseForm) => {
        console.log(expenseData);
        if (isNew) {
            try {
                await addNewExpense(expenseData);
                enqueueSnackbar('Nuevo gasto agregado', { variant: 'success' });
                handleClose();
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Error al agregar nuevo gasto', { variant: 'error' });
            }
        } else {
            try {
                await editExpense(expenseData, expenseId);
                enqueueSnackbar('Gasto editado', { variant: 'success' });
                handleClose();
            } catch (error) {
                console.error(error);
                enqueueSnackbar('Error al editar gasto', { variant: 'error' });
            }
        }
    };
    return (
        <Modal
            closeAfterTransition
            open={open}
            onClose={handleClose}
            aria-labelledby='expense-modal-title'
            aria-describedby='expense-modal-description'
            sx={{
                maxWidth: '600px',
                alignSelf: 'center',
                margin: 'auto',
            }}
        >
            <ExpenseForm isNew={isNew} initialValues={expense} onSubmit={onSubmit} />
        </Modal>
    );
};
