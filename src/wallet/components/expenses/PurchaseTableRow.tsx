import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';

import { CreditCardSimpleItem, Purchase } from '../../../store/interfaces';
import { useWallet } from '../../../hooks';
import { useModal } from '../../hooks';
import { parseCurrency, parseDate } from '../../api/helpers';
import { ExpenseTypeEnum } from '../../enums';
import { Expense } from '../../api/interfaces';
import { ExpenseDeleteDialog } from './ExpenseDeleteDialog';
import { ExpenseModalForm } from './ExpenseModalForm';
import { PurchaseShowDialog } from './PurchaseShowDialog';

interface Props {
    purchase: Purchase;
    creditCards: CreditCardSimpleItem[];
}

export const PurchaseTableRow = ({ purchase, creditCards }: Props) => {
    // const { deleteMutation } = usePurchases();
    const creditCard = creditCards.find((card) => card.id === purchase.creditCardId);
    const creditCardName = creditCard?.alias || '';
    const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
    const { open: openDialogShow, handleOpen: handleOpenDialogShow } = useModal();
    const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
    const { deleteExpenseMutation } = useWallet();

    const handleDelete = () => {
        deleteExpenseMutation.mutate({ id: purchase.id, type: ExpenseTypeEnum.PURCHASE } as Expense);
    };
    const handleConfirmDelete = () => {
        handleOpenDialogDelete();
    };
    return (
        <>
            <TableRow>
                <TableCell>{purchase.title}</TableCell>
                <TableCell>{creditCardName}</TableCell>
                <TableCell>{ExpenseTypeEnum.PURCHASE}</TableCell>
                <TableCell>{parseCurrency(purchase.amount)}</TableCell>
                <TableCell>{purchase.status}</TableCell>
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
