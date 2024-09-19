import { Alert, AlertTitle, Typography } from '@mui/material';
import { ReceiptLong } from '@mui/icons-material';

import { useFilterExpenses, useModal, useWallet } from '../hooks';
import { ExpenseModalForm, ExpensesFilterForm, ExpenseTable } from '../components/expenses';
import { Fab } from '../components/common';

export const ExpensesPage = () => {
    const { purchases, subscriptions, creditCards, simpleCreditCards } = useWallet();
    const { filteredPurchses, filteredSubscriptions, ...restFilterData } = useFilterExpenses({
        originalPurchases: purchases,
        originalSubscriptions: subscriptions,
    });
    const { open, handleOpen } = useModal();
    
    return (
        <>
            <Typography variant='h2'>Expenses</Typography>
            <ExpensesFilterForm creditCards={simpleCreditCards} {...restFilterData} />
            {filteredPurchses.length === 0 && filteredSubscriptions.length === 0 && (
                <Alert severity='info'>
                    <AlertTitle>Nothing to show</AlertTitle>
                    There are no expenses to show!
                </Alert>
            )}
            {(filteredPurchses.length > 0 || filteredSubscriptions.length > 0) && (
                <ExpenseTable purchases={filteredPurchses} subscriptions={filteredSubscriptions} creditCards={creditCards} />
            )}

            <Fab handleClick={handleOpen} icon={<ReceiptLong />} color='primary' />
            <ExpenseModalForm open={open} handleOpen={() => handleOpen()} />
        </>
    );
};
