import { Button, ButtonGroup, Tooltip } from '@mui/material';
import { Block, DeleteForever, Done, DoneAll, EditCalendar, Pending, PriceChange, QuestionMark } from '@mui/icons-material';

import { ExpenseTypeEnum, FullPayment, PaymentStatusEnum } from '../../types';
import { useWallet } from '../../hooks';
import { StyledTableCell, StyledTableRow } from '../shared';
import { formatCurrency, parseDateToString } from '../../helpers';
import { useState } from 'react';
import { UpdateAmountModalForm } from './forms/UpdateAmountModalForm';

interface Props {
    payment: FullPayment;
}

export const PaymentTableRow = ({ payment }: Props) => {
    const [showUpdateAmountModal, setShowUpdateAmountModal] = useState<boolean>(false);
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
                            disabled={payment.status === PaymentStatusEnum.PENDING}
                            onClick={() => handleStatusUpdate(PaymentStatusEnum.PENDING)}
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
                        {showUpdateAmountModal && (
                            <UpdateAmountModalForm
                                handleClose={() => setShowUpdateAmountModal(false)}
                                open={showUpdateAmountModal}
                                payment={payment}
                                handleSubmit={handleAmountUpdate}
                            />
                        )}

                        {payment.expenseType === ExpenseTypeEnum.SUBSCRIPTION && (
                            <Button color='info'>
                                <DeleteForever />
                            </Button>
                        )}
                        <Button color='info'>
                            <EditCalendar />
                        </Button>
                    </ButtonGroup>
                </StyledTableCell>
            </StyledTableRow>
        </>
    );
};

const getPaymentStatusIcon = (status: PaymentStatusEnum) => {
    switch (status) {
        case PaymentStatusEnum.CONFIRMED:
            return <Done color='info' />;
        case PaymentStatusEnum.PAID:
            return <DoneAll color='success' />;
        case PaymentStatusEnum.PENDING:
            return <Pending color='warning' />;
        case PaymentStatusEnum.CANCELED:
            return <Block color='error' />;
        default:
            return <QuestionMark color='disabled' />;
    }
};
