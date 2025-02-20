import { Box, Modal } from '@mui/material';

import { getFullPayment } from '../../helpers';
import { useWalletStore } from '../../store/wallet';
import { CreditCard, Expense } from '../../types';
import { ExpensePaymentTable } from './ExpensePaymentTable';
import { ExpenseInfo } from './ExpenseInfo';

interface Props {
    expense: Expense;
    creditCard: CreditCard;
    open: boolean;
    handleClose: () => void;
}
export const ExpenseModalShow = ({ expense, creditCard, open, handleClose }: Props) => {
    const { creditCards } = useWalletStore();
    // sort by noInstallment asc
    const payments = expense.payments.map((payment) => getFullPayment(payment, [expense], creditCards)).sort(
        (a, b) => {
            if (a.noInstallment === b.noInstallment) {
                return 0;
            }
            return a.noInstallment > b.noInstallment ? 1 : -1;
        }
    )
    return (
        <Modal
            closeAfterTransition
            open={open}
            onClose={handleClose}
            aria-labelledby='expense-modal-title'
            aria-describedby='expense-modal-description'
            sx={{ ...containerProps }}
        >
            <Box sx={{ p: 2, justifyContent: 'space-between' }}>
                <ExpenseInfo expense={expense} creditCard={creditCard} />
                <ExpensePaymentTable payments={payments} expense={expense} />
            </Box>
        </Modal>
    );
};

const containerProps = {
    maxWidth: '1200px',
    alignSelf: 'center',
    margin: 'auto',
    mx: 'auto',
    mt: 5,
    p: 3,
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 3,
};
