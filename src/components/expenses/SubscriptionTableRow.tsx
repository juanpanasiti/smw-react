import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';

import { CreditCardSimpleItem, ExpenseTypeEnum, Subscription } from '../../types';
import { useModal, useWallet } from '../../hooks';
import { parseCurrency } from '../../helpers';
import { ExpenseDeleteDialog } from './ExpenseDeleteDialog';
import { ExpenseModalForm } from './ExpenseModalForm';
import { SubscriptionShowDialog } from './SubscriptionShowDialog';

interface Props {
    subscription: Subscription;
    creditCards: CreditCardSimpleItem[];
}

export const SubscriptionTableRow = ({ subscription, creditCards }: Props) => {
    const creditCard = creditCards.find((card) => card.id === subscription.creditCardId);
    const creditCardName = creditCard?.alias || '';
    const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
    const { open: openDialogShow, handleOpen: handleOpenDialogShow } = useModal();
    const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
    const { deleteExpense } = useWallet();

    const handleDelete = () => {
        deleteExpense(subscription);
    };
    const handleConfirmDelete = () => {
        handleOpenDialogDelete();
    };
    return (
        <>
            <TableRow>
                <TableCell>{subscription.title}</TableCell>
                <TableCell>{creditCardName}</TableCell>
                <TableCell>{ExpenseTypeEnum.SUBSCRIPTION}</TableCell>
                <TableCell>{parseCurrency(subscription.amount)}</TableCell>
                <TableCell>{subscription.status}</TableCell>
                <TableCell>---</TableCell>
                <TableCell>
                    <ButtonGroup variant='contained' aria-label='Basic button group'>
                        <Button color='warning' onClick={handleOpenModalForm}>
                            <Edit />
                        </Button>
                        <Button color='info' onClick={handleOpenDialogShow}>
                            <Visibility />
                        </Button>
                        <Button color='error' onClick={handleConfirmDelete}>
                            <DeleteForever />
                        </Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
            <ExpenseModalForm subscription={subscription} open={openModalForm} handleOpen={() => handleOpenModalForm()} />
            <SubscriptionShowDialog
                subscription={subscription}
                open={openDialogShow}
                handleClose={handleOpenDialogShow}
                creditCardName={creditCardName}
            />
            <ExpenseDeleteDialog
                expenseTitle={subscription.title}
                handleClose={handleOpenDialogDelete}
                open={openDialogDelete}
                handleAgree={handleDelete}
            />
        </>
    );
};
