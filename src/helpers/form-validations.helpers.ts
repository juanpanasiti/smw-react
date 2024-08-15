import * as Yup from 'yup';

export const expenseValidationSchema = Yup.object().shape({
    creditCardId: Yup.number().required('Credit Card is required'),
    title: Yup.string().required('Title is required'),
    ccName: Yup.string().required('Card Name is required'),
    amount: Yup.number().required('Amount is required').min(-Infinity, 'Amount cannot be empty'),
    noInstallments: Yup.number().required('Number of Installments is required').min(1, 'Minimum is 1'),
    acquiredAt: Yup.date().required('Acquired At is required'),
    firstPaymentDate: Yup.date().required('First Payment Date is required'),
});
