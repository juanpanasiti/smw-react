import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';

import { useModal, useWallet } from '../../hooks';
import { CreditCardSimpleItem, ExpenseTypeEnum, Purchase } from '../../types';
import { calcPaidPercentage, parseCurrency, parseDate } from '../../helpers';
import { ExpenseDeleteDialog } from './ExpenseDeleteDialog';
import { ExpenseModalForm } from './ExpenseModalForm';
import { PurchaseShowDialog } from './PurchaseShowDialog';

interface Props {
    purchase: Purchase;
    creditCards: CreditCardSimpleItem[];
}

export const PurchaseTableRow = ({ purchase, creditCards }: Props) => {
    const creditCard = creditCards.find((card) => card.id === purchase.creditCardId);
    const creditCardName = creditCard?.alias || '';
    const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
    const { open: openDialogShow, handleOpen: handleOpenDialogShow } = useModal();
    const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
    const { deleteExpense, paymentsByExpense } = useWallet();
    const payments = paymentsByExpense(purchase.id);
    const paidPercentage = `${calcPaidPercentage(payments).toFixed(2)} %`;

    const handleDelete = () => {
        deleteExpense(purchase);
    };
    const handleConfirmDelete = () => {
        handleOpenDialogDelete();
    };
    if (paidPercentage === '100.00 %') {
        // TODO FIXME: The filter must be located in the superior component and must be dinamic
        return <></>;
    }
    return (
        <>
            <TableRow>
                <TableCell>{purchase.title}</TableCell>
                <TableCell>{creditCardName}</TableCell>
                <TableCell>{ExpenseTypeEnum.PURCHASE}</TableCell>
                <TableCell>{parseCurrency(purchase.amount)}</TableCell>
                <TableCell>{paidPercentage}</TableCell>
                <TableCell>{parseDate(purchase.acquiredAt)}</TableCell>
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
            <ExpenseModalForm purchase={purchase} open={openModalForm} handleOpen={() => handleOpenModalForm()} />
            <PurchaseShowDialog purchase={purchase} open={openDialogShow} handleClose={handleOpenDialogShow} creditCardName={creditCardName} />

            <ExpenseDeleteDialog
                expenseTitle={purchase.title}
                handleClose={handleOpenDialogDelete}
                open={openDialogDelete}
                handleAgree={handleDelete}
            />
        </>
    );
};
