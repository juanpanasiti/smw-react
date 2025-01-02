import { useState } from 'react';

import { Typography } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';

import { Expense, ExpenseTypeEnum } from '../../types';
import { useFilter, usePagination } from '../../hooks';
import { ExpenseSearchForm } from './ExpenseSearchForm';
import PaginationNav from '../shared/PaginationNav';
import { ExpenseTable } from './ExpenseTable';
import { Fab } from '../shared';
import { ExpenseModalForm } from './ExpenseModalForm';
import { IExpenseForm } from '../../types/forms';

interface Props {
    expenses: Expense[];
}

export const ExpenseList = ({ expenses }: Props) => {
    const [pageLimit, setPageLimit] = useState(10);
    const { filteredList, filter, setFilter } = useFilter<Expense>(expenses);
    const { currentPage, currentPageNumber, totalPages, goPage } = usePagination(filteredList, pageLimit);
    const [openModal, setOpenModal] = useState(false)



    return (
        <>
            <Typography variant='h3'>Gastos con tarjeta</Typography>
            {/* Form filter */}
            <ExpenseSearchForm searchFilter={filter} setSearchFilter={setFilter} pageLimit={pageLimit} setPageLimit={setPageLimit} />
            {/* tabla */}
            {currentPage && currentPage.length !== 0 && <ExpenseTable expenses={currentPage} />}
            {(!currentPage || currentPage.length === 0) && <div>No content!</div>}
            <PaginationNav totalPages={totalPages} currentPage={currentPageNumber} handlePageChange={goPage} />
            <Fab handleClick={() => setOpenModal(true)} icon={<AddShoppingCart />} color='primary' />
            {openModal && <ExpenseModalForm open={openModal} handleClose={() => setOpenModal(false)} expense={newExpense} />}
        </>
    );
};

const newExpense: IExpenseForm = {
    accountId: 0,
    amount: 0,
    acquiredAt: new Date(),
    ccName: '',
    title: '',
    firstPaymentDate: new Date(),
    installments: 1,
    type: ExpenseTypeEnum.PURCHASE,
}