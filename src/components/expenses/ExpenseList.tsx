import { Typography } from '@mui/material';
import { Expense } from '../../types';
import { useFilter, usePagination } from '../../hooks';
import { ExpenseSearchForm } from './ExpenseSearchForm';
import { useState } from 'react';
import PaginationNav from '../shared/PaginationNav';
import { ExpenseTable } from './ExpenseTable';

interface Props {
    expenses: Expense[];
}

export const ExpenseList = ({ expenses }: Props) => {
    const [pageLimit, setPageLimit] = useState(10);
    const { filteredList, filter, setFilter } = useFilter<Expense>(expenses);
    const { currentPage, currentPageNumber, totalPages, goPage } = usePagination(filteredList, pageLimit);

    return (
        <>
            <Typography variant='h3'>Gastos con tarjeta</Typography>
            {/* Form filter */}
            <ExpenseSearchForm searchFilter={filter} setSearchFilter={setFilter} pageLimit={pageLimit} setPageLimit={setPageLimit} />
            {/* tabla */}

            {currentPage && currentPage.length !== 0 && <ExpenseTable expenses={currentPage} />}
            {(!currentPage || currentPage.length === 0) && <div>No content!</div>}
            <PaginationNav totalPages={totalPages} currentPage={currentPageNumber} handlePageChange={goPage} />
        </>
    );
};
