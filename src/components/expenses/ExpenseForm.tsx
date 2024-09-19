import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { FormControl, FormHelperText, TextField, Button } from '@mui/material';

import { CreditCardSimpleItem, Expense, ExpenseTypeEnum } from '../../types';
import { expenseValidationSchema, getDefaultExpense } from '../../helpers';
import { useWallet } from '../../hooks';
import { SelectField } from '../common';


interface Props {
    expense?: Expense;
    expenseType: ExpenseTypeEnum;
    afterSuccess?: () => void;
}
const DATE_FORMAT = 'DD-MM-YYYY';

export const ExpenseForm = ({ afterSuccess, expense, expenseType }: Props) => {
    const initialValues: Partial<Expense> = expense || getDefaultExpense(expenseType);
    const { simpleCreditCards, createExpense, updateExpense } = useWallet();

    const handleSubmit = (data: Partial<Expense>) => {
        try {
            if (!data.id){
                createExpense({...data, type: expenseType} as Expense)
            } else {
                updateExpense(data as Expense)
            }
            afterSuccess?.();
        } catch (error) {
            console.error('Error creating expense', error);
        }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={expenseValidationSchema} onSubmit={(values) => handleSubmit(values)}>
            {({ errors, touched, handleChange, setFieldValue, values, isValid }) => (
                <Form>
                    {/* CreditCardId */}
                    <FormControl fullWidth>
                        <SelectField<CreditCardSimpleItem>
                            label='Credit Card'
                            value={values.creditCardId || ''} // Asegúrate de que el valor nunca sea undefined
                            options={simpleCreditCards}
                            idField='id'
                            labelField='alias'
                            onChange={(value) => setFieldValue('creditCardId', value)}
                        />
                        <FormHelperText>{touched.creditCardId && errors.creditCardId ? errors.creditCardId : ''}</FormHelperText>
                    </FormControl>

                    {/* Title */}
                    <FormControl fullWidth margin='normal'>
                        <Field
                            as={TextField}
                            name='title'
                            label='Title'
                            variant='outlined'
                            fullWidth
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                            value={values.title || ''} // Asegúrate de que el valor nunca sea undefined
                            onChange={handleChange}
                        />
                    </FormControl>

                    {/* Name in Credit Card */}
                    <FormControl fullWidth margin='normal'>
                        <Field
                            as={TextField}
                            name='ccName'
                            label='Name in Credit Card'
                            variant='outlined'
                            fullWidth
                            error={touched.ccName && Boolean(errors.ccName)}
                            helperText={touched.ccName && errors.ccName}
                            value={values.ccName || ''} // Asegúrate de que el valor nunca sea undefined
                            onChange={handleChange}
                        />
                    </FormControl>

                    {/* Amount Field */}
                    <FormControl fullWidth margin='normal'>
                        <Field
                            as={TextField}
                            name='amount'
                            label='Amount'
                            variant='outlined'
                            fullWidth
                            type='number' // Specify the input type as number
                            inputProps={{
                                step: '0.01', // Set step to 0.01 for currency
                            }}
                            error={touched.amount && Boolean(errors.amount)}
                            helperText={touched.amount && errors.amount}
                            value={values.amount} // Ensure value is always defined
                            onChange={handleChange}
                        />
                    </FormControl>

                    {/* No of Installments Field */}
                    {expenseType === ExpenseTypeEnum.PURCHASE && (
                        <FormControl fullWidth margin='normal'>
                            <Field
                                as={TextField}
                                name='noInstallments'
                                label='Installments'
                                variant='outlined'
                                fullWidth
                                type='number' // Specify the input type as number
                                inputProps={{
                                    min: 1,
                                }}
                                value={values.noInstallments || 1} // Ensure value is always defined
                                onChange={handleChange}
                            />
                        </FormControl>
                    )}

                    {/* Acquired At Field */}
                    <FormControl fullWidth margin='normal'>
                        <DatePicker
                            label='Acquired At'
                            defaultValue={moment(values.acquiredAt)}
                            onChange={(date) => setFieldValue('acquiredAt', date?.format('YYYY-MM-DD') || '')}
                            format={DATE_FORMAT}
                        />
                    </FormControl>

                    {/* First Payment Date Field */}
                    <FormControl fullWidth margin='normal'>
                        <DatePicker
                            label='First Payment Date'
                            defaultValue={moment(values.firstPaymentDate)}
                            onChange={(date) => setFieldValue('firstPaymentDate', date?.format('YYYY-MM-DD') || '')}
                            format={DATE_FORMAT}
                        />
                    </FormControl>
                    <Button onClick={() => handleSubmit(values)} variant='contained' color='primary' disabled={!isValid}>
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
