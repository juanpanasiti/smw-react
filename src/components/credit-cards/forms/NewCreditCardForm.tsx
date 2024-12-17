import React from 'react';

import { Box, Button, FormControl, SxProps, TextField, Theme, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { useForm } from '../../../hooks';
import { CreditCardOption, NewCreditCard } from '../../../types/forms';
import { useWallet } from '../../../hooks/useWallet';
import { CreditCard } from '../../../types';
import { SelectField } from '../../shared';

interface Props {
    sx?: SxProps<Theme>;
    onSubmit: (values: NewCreditCard) => void;
}
export const NewCreditCardForm = React.forwardRef<HTMLDivElement, Props>(({ sx = {}, onSubmit }: Props, ref) => {
    const { values, handleChange, reset } = useForm<NewCreditCard>({
        alias: '',
        limit: 0,
        mainCreditCardId: undefined,
        nextClosingDate: new Date(),
        nextExpiringDate: new Date(),
    });

    const { creditCards } = useWallet();
    const creditCardsOptions = getCreditCardOptions(creditCards);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            onSubmit(values);

        } catch (error) {
            console.error(error)
        }
    };
    return (
        <Box ref={ref} tabIndex={-1} component='form' onSubmit={handleSubmit} sx={{ ...containerProps, ...sx }}>
            <Typography variant='h4' gutterBottom>
                Nueva Tarjeta de Crédito
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

const getCreditCardOptions = (creditCards: CreditCard[]): CreditCardOption[] => {
    return creditCards
        .filter((cc) => cc.mainCreditCardId === null)
        .map((cc) => ({
            id: cc.id,
            alias: cc.alias,
        }));
};
const DATE_FORMAT = 'DD-MM-YYYY';
