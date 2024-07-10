import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { CreditCardMain } from '../../../store/interfaces';
import { DeleteForever, Edit, Visibility } from '@mui/icons-material';
import { CreditCardModal } from './CreditCardModal';
import { useModal, useWallet } from '../../hooks';
import { CreditCardDeleteDialog } from './CreditCardDeleteDialog';
import { CreditCardInfoDialog } from './CreditCardInfoDialog';
import { parseCurrency, parseDate } from '../../api/helpers';

interface Props {
    creditCard: CreditCardMain;
}

export const CreditCardCard = ({ creditCard }: Props) => {
    const { deleteCreditCardById } = useWallet();
    // const { purchases, subscriptions } = useExpenses();
    // const ccPurchases = filterExpenses(purchases, creditCard.id);
    // const ccSubscriptions = filterExpenses(subscriptions, creditCard.id);
    // const totalRemainingPurchases = getTotalRemaining(ccPurchases)
    // const totalRemainingSubscriptions = getTotalRemaining(ccSubscriptions)
    const limitStr = parseCurrency(creditCard.limit);
    const totalSpentStr = parseCurrency(creditCard.totalSpent);
    const closesAt = parseDate(creditCard.nextClosingDate);
    const expiringAt = parseDate(creditCard.nextExpiringDate);
    const { open: openModalForm, handleOpen: handleOpenModalForm } = useModal();
    const { open: openDialogDelete, handleOpen: handleOpenDialogDelete } = useModal();
    const { open: openDialogShow, handleOpen: handleOpenDialogShow } = useModal();

    const handleDelete = () => {
        deleteCreditCardById(creditCard.id);
    };
    const handleConfirmDelete = () => {
        handleOpenDialogDelete();
        console.warn('not implemented');
    };
    return (
        <Card>
            <CardHeader
                sx={{ color: 'primary.main' }}
                title={creditCard.alias}
                // subheader='September 14, 2016'
            />
            <CardContent>
                <Typography>
                    <b>Limit:</b> {limitStr}
                </Typography>
                <Typography>
                    <b>Total Spent:</b> {totalSpentStr}
                </Typography>
                <Typography>
                    <b>Purchases:</b> {'---'}
                </Typography>
                <Typography>
                    <b>Subscriptions:</b> {'---'}
                </Typography>

                <Typography>
                    <b>Closes at:</b> {closesAt}
                </Typography>
                <Typography>
                    <b>Exp. at:</b> {expiringAt}
                </Typography>
                <Typography>
                    <b>Extensions:</b> {creditCard.extensions.length}
                </Typography>
            </CardContent>

            <CardActions>
                <Button onClick={handleOpenDialogShow} color='info'>
                    <Visibility />
                </Button>
                <Button onClick={handleOpenModalForm} color='warning'>
                    <Edit />
                </Button>
                <Button onClick={handleConfirmDelete} color='error' sx={{ ml: 2 }}>
                    <DeleteForever />
                </Button>
            </CardActions>

            <CreditCardInfoDialog open={openDialogShow} handleClose={handleOpenDialogShow} creditCard={creditCard} />
            <CreditCardDeleteDialog
                creditCardName={creditCard.alias}
                handleClose={handleOpenDialogDelete}
                open={openDialogDelete}
                handleAgree={handleDelete}
            />
            <CreditCardModal creditCard={creditCard} open={openModalForm} handleOpen={() => handleOpenModalForm()} />
        </Card>
    );
};
