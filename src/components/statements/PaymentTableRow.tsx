import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { Block, DeleteForever, Done, DoneAll, EditCalendar, Pending, PriceChange, QuestionMark } from '@mui/icons-material';

import { ExpenseTypeEnum, FullPayment, PaymentStatusEnum } from '../../types';
import { useWallet } from '../../hooks';
import { StyledTableCell, StyledTableRow } from '../shared';
import { formatCurrency, parseDateToString, parseMonthAndYear } from '../../helpers';
import { useState } from 'react';
import { UpdateAmountModalForm, UpdatePaymentDateModalForm } from './forms';

interface Props {
    payment: FullPayment;
}

export const PaymentTableRow = ({ payment }: Props) => {
    const [showUpdateAmountModal, setShowUpdateAmountModal] = useState<boolean>(false);
    const [showUpdatePaymentDateModal, setShowUpdatePaymentDateModal] = useState<boolean>(false);
    const { getExpenseById, editPurchasePayment, editSubscriptionPayment } = useWallet();
    const expense = getExpenseById(payment.expenseId);
    const acquiredAt = expense?.type === ExpenseTypeEnum.PURCHASE ? parseDateToString(expense.acquiredAt) : '---';
    const installment = expense?.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';

    const handleStatusUpdate = (status: PaymentStatusEnum) => {
        if (payment.expenseType === ExpenseTypeEnum.PURCHASE) {
            editPurchasePayment({ status }, payment.expenseId, payment.id);
        } else {
            editSubscriptionPayment({ status }, payment.expenseId, payment.id, payment.accountId);
        }
    };

    const handleAmountUpdate = (amount: number) => {
        if (payment.expenseType === ExpenseTypeEnum.PURCHASE) {
            editPurchasePayment({ amount }, payment.expenseId, payment.id);
        } else {
            editSubscriptionPayment({ amount }, payment.expenseId, payment.id, payment.accountId);
        }
    };
    const handlePaymentDateUpdate = (newDate: Date) => {
        const newPaymentDate = parseMonthAndYear(newDate);
        if (payment.expenseType === ExpenseTypeEnum.PURCHASE) {
            editPurchasePayment(newPaymentDate, payment.expenseId, payment.id);
        } else {
            editSubscriptionPayment(newPaymentDate, payment.expenseId, payment.id, payment.accountId);
        }
    };

    return (
        <>
            <StyledTableRow>
                <Tooltip title={payment.expenseCcName} placement='left'>
                    <StyledTableCell component='th' scope='row'>
                        {payment.expenseTitle}
                    </StyledTableCell>
                </Tooltip>
                <StyledTableCell align='right'>{payment.creditCardAlias}</StyledTableCell>

                <StyledTableCell align='right'>{formatCurrency(payment.amount)}</StyledTableCell>
                <StyledTableCell align='right'>{acquiredAt}</StyledTableCell>
                <StyledTableCell align='right'>{installment}</StyledTableCell>
                <StyledTableCell align='right'>{getPaymentStatusIcon(payment.status)}</StyledTableCell>
                <StyledTableCell align='right'>
                    <ButtonGroup size='small' aria-label='Small button group'>
                        <Button
                            disabled={payment.status === PaymentStatusEnum.CONFIRMED}
                            onClick={() => handleStatusUpdate(PaymentStatusEnum.CONFIRMED)}
                            color='info'
                        >
                            <Done />
                        </Button>
                        <Button
                            disabled={payment.status === PaymentStatusEnum.PAID}
                            onClick={() => handleStatusUpdate(PaymentStatusEnum.PAID)}
                            color='success'
                        >
                            <DoneAll />
                        </Button>
                        <Button
                            disabled={payment.status === PaymentStatusEnum.UNCONFIRMED}
                            onClick={() => handleStatusUpdate(PaymentStatusEnum.UNCONFIRMED)}
                            color='warning'
                        >
                            <Pending />
                        </Button>
                        <Button
                            disabled={payment.status === PaymentStatusEnum.CANCELED}
                            onClick={() => handleStatusUpdate(PaymentStatusEnum.CANCELED)}
                            color='error'
                        >
                            <Block />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup size='small' aria-label='Small button group' sx={{ marginLeft: '5px' }}>
                        <Button color='info' onClick={() => setShowUpdateAmountModal(true)}>
                            <PriceChange />
                        </Button>

                        {payment.expenseType === ExpenseTypeEnum.SUBSCRIPTION && (
                            <Button color='info'>
                                <DeleteForever />
                            </Button>
                        )}
                        <Button color='info' onClick={() => setShowUpdatePaymentDateModal(true)}>
                            <EditCalendar />
                        </Button>
                    </ButtonGroup>
                </StyledTableCell>
            </StyledTableRow>

            {/* Modals */}
            {showUpdateAmountModal && (
                <UpdateAmountModalForm
                    handleClose={() => setShowUpdateAmountModal(false)}
                    open={showUpdateAmountModal}
                    payment={payment}
                    handleSubmit={handleAmountUpdate}
                />
            )}
            {showUpdatePaymentDateModal && (
                <UpdatePaymentDateModalForm
                    handleClose={() => setShowUpdatePaymentDateModal(false)}
                    open={showUpdatePaymentDateModal}
                    payment={payment}
                    handleSubmit={handlePaymentDateUpdate}
                />
            )}
        </>
    );
};

const getPaymentStatusIcon = (status: PaymentStatusEnum) => {
    switch (status) {
        case PaymentStatusEnum.CONFIRMED:
            return <Done color='info' />;
        case PaymentStatusEnum.PAID:
            return <DoneAll color='success' />;
        case PaymentStatusEnum.UNCONFIRMED:
            return <Pending color='warning' />;
        case PaymentStatusEnum.CANCELED:
            return <Block color='error' />;
        default:
            return <QuestionMark color='disabled' />;
    }
};
