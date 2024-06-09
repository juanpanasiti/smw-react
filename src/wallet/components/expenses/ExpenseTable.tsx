import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CreditCardMain, Purchase, Subscription } from '../../../store/interfaces';
import { SubscriptionTableRow, PurchaseTableRow } from '.';

interface Props {
    purchases: Purchase[];
    subscriptions: Subscription[];
    creditCards: CreditCardMain[];
}
export const ExpenseTable = ({ purchases, subscriptions, creditCards }: Props) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Acquired At</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscriptions.map((subscription) => (
                        <SubscriptionTableRow key={subscription.id} subscription={subscription} creditCards={creditCards} />
                    ))}
                    {purchases.map((purchase) => (
                        <PurchaseTableRow key={purchase.id} purchase={purchase} creditCards={creditCards} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
