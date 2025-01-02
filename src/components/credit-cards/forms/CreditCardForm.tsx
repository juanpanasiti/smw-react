import React from 'react';

import { Box, Button, FormControl, SxProps, TextField, Theme, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { useForm, useWallet } from '../../../hooks';
import { CreditCardOption, ICreditCardForm } from '../../../types/forms';
import { SelectField } from '../../shared';

interface Props<T extends ICreditCardForm> {
    sx?: SxProps<Theme>;
    onSubmit: (values: T) => void;
    initialValues: T;
    isNew?: boolean;
}
export const CreditCardForm = React.forwardRef<HTMLDivElement, Props<ICreditCardForm>>(({ sx = {}, onSubmit, initialValues, isNew = false }, ref) => {
    // TODO: Transformar en un componente genérico, identificando si es para una nueva CC o una existente (update)
    const { values, changedValues, handleChange, reset } = useForm(initialValues);

    const { getCreditCardOptions } = useWallet();
    const creditCardsOptions = getCreditCardOptions();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isNew) {
                onSubmit(values);
            } else {
                onSubmit(changedValues);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const title = isNew ? 'Nueva Tarjeta de Crédito' : 'Actualizar Tarjeta de Crédito';
    return (
        <Box ref={ref} tabIndex={-1} component='form' onSubmit={handleSubmit} sx={{ ...containerProps, ...sx }}>
            <Typography variant='h4' gutterBottom>
                {title}
            </Typography>

            {/* Main Credit Card ID */}
            <SelectField<CreditCardOption, number>
                label='Tarjeta de crédito principal'
                value={values.mainCreditCardId}
                options={creditCardsOptions}
                idField='id'
                labelField='alias'
                onChange={(value) => handleChange('mainCreditCardId', +value)}
            />

            {/* Alias */}
            <TextField
                fullWidth
                label='Alias'
                autoComplete='off'
                placeholder='Ej: VISA - ####'
                type='text'
                value={values.alias || ''}
                onChange={(e) => handleChange('alias', e.target.value)}
                margin='normal'
                required
            />

            {/* Limit */}
            <TextField
                fullWidth
                label='Limit'
                type='number'
                slotProps={{
                    htmlInput: {
                        step: '0.01',
                    },
                }}
                value={values.limit || ''}
                autoComplete='off'
                onChange={(e) => handleChange('limit', +e.target.value)}
                margin='normal'
                required
            />

            {/* Closing Date */}
            <FormControl fullWidth margin='normal'>
                <DatePicker
                    label='Fecha de Cierre'
                    value={values.nextClosingDate ? dayjs(values.nextClosingDate) : null} // Usa value en lugar de defaultValue
                    onChange={(date) => {
                        if (date && date.toDate() !== values.nextClosingDate) {
                            handleChange('nextClosingDate', date?.toDate() || undefined);
                        }
                    }}
                    format={DATE_FORMAT}
                />
            </FormControl>

            {/* Due Date */}
            <FormControl fullWidth margin='normal'>
                <DatePicker
                    label='Fecha de Vencimiento'
                    value={values.nextExpiringDate ? dayjs(values.nextExpiringDate) : null} // Usa value en lugar de defaultValue
                    onChange={(date) => {
                        if (date && date.toDate() !== values.nextExpiringDate) {
                            handleChange('nextExpiringDate', date?.toDate() || undefined);
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
