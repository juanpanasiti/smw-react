import { useState } from 'react';

import { Box, Button, FormControl, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useForm } from 'react-hook-form';
import moment from 'moment';

import { Purchase, Subscription } from '../../../store/interfaces';
import { useWallet } from '../../../hooks';
import { ExpenseTypeEnum } from '../../enums';
import { Expense } from '../../api/interfaces';
import { cleanPurchaseToForm, cleanSubscriptionToForm } from '../../api/helpers';

interface Props {
    purchase?: Purchase;
    subscription?: Subscription;
    afterSubmit?: () => void;
}
const DATE_FORMAT = 'DD-MM-YYYY';

export const ExpenseForm = ({ purchase, subscription, afterSubmit }: Props) => {
    const defaultValues = getFormValues(purchase, subscription);
    const { register, handleSubmit, setValue } = useForm<Partial<Expense>>({ defaultValues });
    const [expenseType, setExpenseType] = useState<ExpenseTypeEnum>(getExpenseType(subscription));
    const isNew = !(purchase || subscription);
    const { simpleCreditCards, createExpenseMutation, updateExpenseMutation } = useWallet();
    const onSubmit = (data: Partial<Expense>) => {
        try {
            const expense: Partial<Expense> = expenseType === ExpenseTypeEnum.PURCHASE ? cleanPurchaseToForm(data) : cleanSubscriptionToForm(data);
            if (isNew) {
                createExpenseMutation.mutate(expense as Expense);
            } else {
                updateExpenseMutation.mutate(expense as Expense);
            }
            afterSubmit && afterSubmit();
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectChangeCreditCard = (cardId: string) => {
        setValue('creditCardId', +cardId);
    };
    const handleToggle = () => {
        setExpenseType(expenseType === ExpenseTypeEnum.PURCHASE ? ExpenseTypeEnum.SUBSCRIPTION : ExpenseTypeEnum.PURCHASE);
    };
    const handleChangeDate = (date: string, field: 'firstPaymentDate' | 'acquiredAt') => {
        setValue(field, date);
    };
    return (
        <>
            {isNew && (
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Typography>Subscription</Typography>
                    <Switch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onChange={handleToggle} />
                    <Typography>Purchase</Typography>
                </Stack>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box>
                    {/* creditCard */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            select
                            label='Creidt Card'
                            defaultValue={defaultValues.creditCardId?.toString() || ''}
                            fullWidth
                            onChange={(e) => handleSelectChangeCreditCard(e.target.value)}
                        >
                            {simpleCreditCards.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.alias}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>

                    {/* title */}
                    <TextField label='Title' type='text' fullWidth sx={{ mb: 2 }} {...register('title', { required: true })} />

                    {/* ccName */}
                    <TextField label='Name in Credit Card Resume' type='text' fullWidth sx={{ mb: 2 }} {...register('ccName', { required: true })} />

                    {/* amount */}
                    <TextField
                        label='Cost'
                        type='number'
                        inputProps={{
                            step: '0.01',
                        }}
                        fullWidth
                        sx={{ mb: 2 }}
                        {...register('amount', { required: true, valueAsNumber: true })}
                    />
                    {/* Purchase Fields */}
                    {expenseType === ExpenseTypeEnum.PURCHASE && isNew && (
                        <>
                            {/* Installments */}
                            <TextField
                                label='Installments'
                                type='number'
                                fullWidth
                                sx={{ mb: 2 }}
                                {...register('installments', { required: true, valueAsNumber: true, min: 1 })}
                            />
                        </>
                    )}

                    {(expenseType === ExpenseTypeEnum.PURCHASE || isNew) && (
                        <>
                            {/* Acquired At Date */}
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <DatePicker
                                    label='Acquired At'
                                    defaultValue={moment(defaultValues.acquiredAt)}
                                    onChange={(date) => handleChangeDate(date?.format('YYYY-MM-DD') || '', 'acquiredAt')}
                                    format={DATE_FORMAT}
                                />
                            </FormControl>

                            {/* firstPaymentDate */}
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <DatePicker
                                    label='First Payment Date'
                                    defaultValue={moment(defaultValues.firstPaymentDate)}
                                    onChange={(date) => handleChangeDate(date?.format('YYYY-MM-DD') || '', 'firstPaymentDate')}
                                    format={DATE_FORMAT}
                                />
                            </FormControl>
                        </>
                    )}

                    <Button type='submit' color='primary' variant='outlined'>
                        {isNew ? 'Create' : 'Save'}
                    </Button>
                </Box>
            </form>
        </>
    );
};

const getExpenseType = (subscription?: Subscription) => {
    if (subscription) {
        return ExpenseTypeEnum.SUBSCRIPTION;
    }
    return ExpenseTypeEnum.PURCHASE;
};
const getFormValues = (purchase?: Purchase, subscription?: Subscription): Partial<Expense> => {
    if (purchase) {
        return purchase;
    } else if (subscription) {
        return subscription;
    }
    return {};
};
