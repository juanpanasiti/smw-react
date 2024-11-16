import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { SubscriptionTableRow } from './SubscriptionTableRow';
import { PurchaseTableRow } from './PurchaseTableRow';
import { ExpensesFilterForm } from './ExpensesFilterForm';
import { useFilterExpenses, useWallet } from '../../hooks';
import { NoContentAlert } from '../common';

export const ExpenseTable = () => {
    const { purchases, subscriptions, creditCards, simpleCreditCards } = useWallet();
    const { filteredPurchses, filteredSubscriptions, ...restFilterData } = useFilterExpenses({
        originalPurchases: purchases,
        originalSubscriptions: subscriptions,
    });

    if (filteredPurchses.length === 0 && filteredSubscriptions.length === 0) {
        return <NoContentAlert />;
    }
    return (
        <>
            <ExpensesFilterForm creditCards={simpleCreditCards} {...restFilterData} />
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
        </>
    );
};
