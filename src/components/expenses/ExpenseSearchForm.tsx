import { Dispatch, SetStateAction } from 'react';

import { styled } from 'styled-components';
import { Checkbox, FormControl, InputAdornment, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

import { Expense, ExpenseStatusEnum, ExpenseTypeEnum } from '../../types';
import { Filter, FilterOption } from '../../types/forms';
import { useWallet } from '../../hooks';

interface Props {
    searchFilter: Filter<Expense>;
    setSearchFilter: Dispatch<SetStateAction<Filter<Expense>>>;
    pageLimit: number;
    setPageLimit: Dispatch<SetStateAction<number>>;
}

const options: FilterOption<Expense>[] = [
    { id: 'title', label: 'Título' },
    { id: 'ccName', label: 'Nombre resumen' },
    { id: 'amount', label: 'Monto' },
    //     status: ExpenseStatusEnum;
];
export const ExpenseSearchForm = ({ searchFilter, setSearchFilter, pageLimit, setPageLimit }: Props) => {
    const { creditCards } = useWallet();
    const handleFieldListChange = (selected: (keyof Expense)[]) => {
        setSearchFilter({ ...searchFilter, fields: selected });
    };
    const handleSearchTextChange = (text: string) => {
        setSearchFilter({ ...searchFilter, text });
    };

    const handleCreditCardSelected = (selected: number) => {
        if (selected) {
            const newQuery: Filter<Expense>['query'] = { ...searchFilter.query, accountId: selected };
            setSearchFilter({ ...searchFilter, query: newQuery });
        } else {
            const newQuery: Filter<Expense>['query'] = { ...searchFilter.query };
            delete newQuery.accountId;
            setSearchFilter({ ...searchFilter, query: newQuery });
        }
    };

    const handleExpenseTypeSelected = (selected: ExpenseTypeEnum) => {
        if (selected) {
            const newQuery: Filter<Expense>['query'] = { ...searchFilter.query, type: selected };
            setSearchFilter({ ...searchFilter, query: newQuery });
        } else {
            const newQuery: Filter<Expense>['query'] = { ...searchFilter.query };
            delete newQuery.type;
            setSearchFilter({ ...searchFilter, query: newQuery });
        }
    };

    const handleExpenseStatusSelected = (selected: ExpenseStatusEnum) => {
        if (selected) {
            const newQuery: Filter<Expense>['query'] = { ...searchFilter.query, status: selected };
            setSearchFilter({ ...searchFilter, query: newQuery });
        } else {
            const newQuery: Filter<Expense>['query'] = { ...searchFilter.query };
            delete newQuery.status;
            setSearchFilter({ ...searchFilter, query: newQuery });
        }
    };

    const handlePageLimitSelected = (limit: number) => {
        setPageLimit(limit);
    }
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
                    onChange={({ target }) => handleFieldListChange(target.value as (keyof Expense)[])}
                    input={<OutlinedInput label='Campos' />}
                    renderValue={(selected) => selected.join(', ')}
                    // MenuProps={MenuProps}
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
                    value={searchFilter.query.type || ''}
                    label='Tipo de gasto'
                    onChange={(e) => handleExpenseTypeSelected(e.target.value as ExpenseTypeEnum)}
                >
                    <MenuItem value=''>Cualquiera</MenuItem>
                    <MenuItem value='purchase'>Compra</MenuItem>
                    <MenuItem value='subscription'>Subscripción</MenuItem>
                </Select>
            </FormControl>

            {/* Expense Status */}
            <FormControl fullWidth>
                <InputLabel id='expense-status-label'>Estado</InputLabel>
                <Select
                    labelId='expense-status-label'
                    id='expense-status'
                    value={searchFilter.query.status || ''}
                    label='Estado'
                    onChange={(e) => handleExpenseStatusSelected(e.target.value as ExpenseStatusEnum)}
                >
                    <MenuItem value=''>Cualquiera</MenuItem>
                    <MenuItem value='active'>Activo</MenuItem>
                    <MenuItem value='finished'>Finalizado</MenuItem>
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
    /* background-color: crimson; */
`;
