import React from 'react';

import { Box, Button, FormControl, InputLabel, MenuItem, Select, SxProps, TextField, Theme, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { IExpenseForm } from '../../../types/forms';
import { useForm, useWallet } from '../../../hooks';
import { CreditCardOption } from '../../../types/forms';
import { SelectField } from '../../shared';
import { ExpenseTypeEnum } from '../../../types';

interface Props<T extends IExpenseForm> {
    sx?: SxProps<Theme>;
    onSubmit: (values: T) => void;
    initialValues: T;
    isNew?: boolean;
}

export const ExpenseForm = React.forwardRef<HTMLDivElement, Props<IExpenseForm>>(({ sx = {}, onSubmit, initialValues, isNew = false }, ref) => {
    const { values, changedValues, handleChange, reset } = useForm(initialValues);

    const { getCreditCardOptions } = useWallet();
    const creditCardsOptions = getCreditCardOptions(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isNew) {
                onSubmit(values);
            } else {
                onSubmit(changedValues as IExpenseForm);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const title = isNew ? 'Nuevo Gasto' : 'Actualizar Gasto';
    return (
        <Box ref={ref} tabIndex={-1} component='form' onSubmit={handleSubmit} sx={{ ...containerProps, ...sx }}>
            <Typography variant='h4' gutterBottom>
                {title}
            </Typography>

            {/* Credit Card ID */}
            <SelectField<CreditCardOption, number>
                label='Tarjeta de crédito'
                value={values.accountId}
                options={creditCardsOptions}
                idField='id'
                labelField='alias'
                onChange={(value) => handleChange('accountId', +value)}
                disabled={!isNew}
            />

            {/* Expense Type */}
            <FormControl fullWidth sx={{ marginTop: '1.5rem' }}>
                <InputLabel id='expense-type-label'>Tipo de gasto</InputLabel>
                <Select
                    labelId='expense-type-label'
                    id='expense-type'
                    value={values.type}
                    label='Tipo de gasto'
                    onChange={(e) => handleChange('type', e.target.value as ExpenseTypeEnum)}
                    disabled={!isNew}
                >
                    <MenuItem value='purchase'>Compra</MenuItem>
                    <MenuItem value='subscription'>Subscripción</MenuItem>
                </Select>
            </FormControl>

            {/* Title */}
            <TextField
                fullWidth
                label='Título'
                autoComplete='off'
                type='text'
                value={values.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                margin='normal'
                required
            />

            {/* ccName */}
            <TextField
                fullWidth
                label='Nombre en Resumen'
                autoComplete='off'
                type='text'
                value={values.ccName || ''}
                onChange={(e) => handleChange('ccName', e.target.value)}
                margin='normal'
                required
            />

            {/* Amount */}
            <TextField
                fullWidth
                label='Monto'
                type='number'
                slotProps={{
                    htmlInput: {
                        step: '0.01',
                        min: 0,
                        defaultValue: 0,
                    },
                }}
                value={values.amount || ''}
                autoComplete='off'
                onChange={(e) => handleChange('amount', +e.target.value)}
                margin='normal'
                required
                disabled={!isNew}
            />

            {/* Installments */}
            <TextField
                fullWidth
                label='Cuotas'
                type='number'
                slotProps={{
                    htmlInput: {
                        step: '1',
                        min: 1,
                        defaultValue: 1,
                    },
                }}
                value={values.installments || ''}
                autoComplete='off'
                onChange={(e) => handleChange('installments', +e.target.value)}
                margin='normal'
                required
                disabled={!isNew}
            />

            {/* Fecha de Compra/Adquirido */}
            <FormControl fullWidth margin='normal'>
                <DatePicker
                    label='Fecha de Compra/Adquirido'
                    value={values.acquiredAt ? dayjs(values.acquiredAt) : null} // Usa value en lugar de defaultValue
                    onChange={(date) => {
                        if (date && date.toDate() !== values.acquiredAt) {
                            handleChange('acquiredAt', date?.toDate() || undefined);
                        }
                    }}
                    format={DATE_FORMAT}
                />
            </FormControl>

            {/* Fecha Primer pago */}
            <FormControl fullWidth margin='normal'>
                <DatePicker
                    label='Fecha de 1er pago'
                    value={values.firstPaymentDate ? dayjs(values.firstPaymentDate) : null}
                    onChange={(date) => {
                        if (date && date.toDate() !== values.firstPaymentDate) {
                            handleChange('firstPaymentDate', date?.toDate() || undefined);
                        }
                    }}
                    format={DATE_FORMAT}
                />
            </FormControl>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button type='submit' variant='contained' color='primary'>
                    Guardar
                </Button>
                <Button type='button' variant='outlined' color='secondary' onClick={reset}>
                    Limpiar
                </Button>
            </Box>
        </Box>
    );
});

const containerProps = {
    mx: 'auto',
    mt: 5,
    p: 3,
    backgroundColor: 'background.paper',
    borderRadius: 2,
    boxShadow: 3,
};

const DATE_FORMAT = 'DD-MM-YYYY';
