import { Dispatch, SetStateAction } from 'react';

import { styled } from 'styled-components';
import { Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import { ExpenseTypeEnum, FullPayment, PaymentStatusEnum } from '../../../types';
import { Filter, FilterOption } from '../../../types/forms';
import { useWallet } from '../../../hooks';

interface Props {
    searchFilter: Filter<FullPayment>;
    setSearchFilter: Dispatch<SetStateAction<Filter<FullPayment>>>;
    pageLimit: number;
    setPageLimit: Dispatch<SetStateAction<number>>;
}

export const PaymentSearchForm = ({ searchFilter, setSearchFilter, pageLimit, setPageLimit }: Props) => {
    const { creditCards } = useWallet();

    const handleFieldListChange = (selected: (keyof FullPayment)[]) => {
        setSearchFilter({ ...searchFilter, fields: selected });
    };
    const handleSearchTextChange = (text: string) => {
        setSearchFilter({ ...searchFilter, text });
    };
    const handleCreditCardSelected = (selected: number) => {
        if (selected) {
            const newQuery: Filter<FullPayment>['query'] = { ...searchFilter.query, accountId: selected };
            setSearchFilter({ ...searchFilter, query: newQuery });
        } else {
            const newQuery: Filter<FullPayment>['query'] = { ...searchFilter.query };
            delete newQuery.accountId;
            setSearchFilter({ ...searchFilter, query: newQuery });
        }
    };
    const handleExpenseTypeSelected = (selected: ExpenseTypeEnum) => {
        if (selected) {
            const newQuery: Filter<FullPayment>['query'] = { ...searchFilter.query, expenseType: selected };
            setSearchFilter({ ...searchFilter, query: newQuery });
        } else {
            const newQuery: Filter<FullPayment>['query'] = { ...searchFilter.query };
            delete newQuery.expenseType;
            setSearchFilter({ ...searchFilter, query: newQuery });
        }
    };

    const handlePaymentStatusSelected = (selected: PaymentStatusEnum) => {
        if (selected) {
            const newQuery: Filter<FullPayment>['query'] = { ...searchFilter.query, status: selected };
            setSearchFilter({ ...searchFilter, query: newQuery });
        } else {
            const newQuery: Filter<FullPayment>['query'] = { ...searchFilter.query };
            delete newQuery.status;
            setSearchFilter({ ...searchFilter, query: newQuery });
        }
    };

    const handlePageLimitSelected = (limit: number) => {
        setPageLimit(limit);
    };
    return (
        <ContainerFake>
            {/* Filter text */}
            <TextField
                fullWidth
                sx={{ margin: '10px 0px' }}
                id='search-filter-text'
                label='Filtro'
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Search />
                            </InputAdornment>
                        ),
                    },
                }}
                variant='outlined'
                value={searchFilter.text || ''}
                onChange={(e) => handleSearchTextChange(e.target.value)}
            />
            {/* Filter Fields */}
            <FormControl fullWidth>
                <InputLabel id='filter-fileds-label'>Campos</InputLabel>
                <Select
                    labelId='filter-fileds-label'
                    id='filter-fileds'
                    multiple
                    value={searchFilter.fields}
                    onChange={({ target }) => handleFieldListChange(target.value as (keyof FullPayment)[])}
                    input={<OutlinedInput label='Campos' />}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            <Checkbox checked={searchFilter.fields.includes(option.id)} />
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Credit card */}
            <FormControl fullWidth>
                <InputLabel id='credit-card-label'>Tarjeta de Crédito</InputLabel>
                <Select
                    labelId='credit-card-label'
                    id='credit-card'
                    value={searchFilter.query.accountId}
                    label='Tarjeta de Crédito'
                    onChange={(e) => handleCreditCardSelected(e.target.value as number)}
                >
                    <MenuItem value={undefined}>Cualquiera</MenuItem>
                    {creditCards.map((card) => (
                        <MenuItem key={card.id} value={card.id}>
                            {card.alias}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Expense Type */}
            <FormControl fullWidth>
                <InputLabel id='expense-type-label'>Tipo de gasto</InputLabel>
                <Select
                    labelId='expense-type-label'
                    id='expense-type'
                    value={searchFilter.query.expenseType || ''}
                    label='Tipo de gasto'
                    onChange={(e) => handleExpenseTypeSelected(e.target.value as ExpenseTypeEnum)}
                >
                    <MenuItem value=''>Cualquiera</MenuItem>
                    <MenuItem value='purchase'>Compra</MenuItem>
                    <MenuItem value='subscription'>Subscripción</MenuItem>
                </Select>
            </FormControl>

            {/* Payment Status */}
            <FormControl fullWidth>
                <InputLabel id='payment-status-label'>Estado</InputLabel>
                <Select
                    labelId='payment-status-label'
                    id='payment-status'
                    value={searchFilter.query.status || ''}
                    label='Estado'
                    onChange={(e) => handlePaymentStatusSelected(e.target.value as PaymentStatusEnum)}
                >
                    <MenuItem value=''>Cualquiera</MenuItem>
                    <MenuItem value='pending'>Pendiente</MenuItem>
                    <MenuItem value='confirmed'>Confirmado</MenuItem>
                    <MenuItem value='paid'>Pagado</MenuItem>
                    <MenuItem value='canceled'>Cancelado</MenuItem>
                    <MenuItem value='simulated'>Simulado</MenuItem>
                </Select>
            </FormControl>

            {/* Page Limit */}
            <FormControl fullWidth>
                <InputLabel id='expense-type-label'>Página</InputLabel>
                <Select
                    labelId='expense-type-label'
                    id='expense-type'
                    value={pageLimit || 10}
                    label='Página'
                    onChange={(e) => handlePageLimitSelected(+e.target.value)}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </ContainerFake>
    );
};
const ContainerFake = styled.section`
    display: flex;
`;

const options: FilterOption<FullPayment>[] = [
    { id: 'expenseTitle', label: 'Título' },
    { id: 'expenseCcName', label: 'Nombre resumen' },
    { id: 'amount', label: 'Monto' },
];