import { Button, ButtonGroup } from '@mui/material';
import { Block, DeleteForever, Done, DoneAll, EditCalendar, Pending, PriceChange } from '@mui/icons-material';

import { Expense, ExpenseTypeEnum, FullPayment, PaymentStatusEnum } from '../../types';
import { useWalletMigrations } from '../../hooks';
import { AgreeActionDialog, StyledTableCell, StyledTableRow } from '../shared';
import { formatCurrency, getPaymentStatusIcon, parseMonthAndYear } from '../../helpers';
import { useState } from 'react';
import { UpdateAmountModalForm, UpdatePaymentDateModalForm } from '../statements/forms';

interface Props {
    payment: FullPayment;
    expense: Expense;
}

export const ExpensePaymentTableRow = ({ payment, expense }: Props) => {
    const [showUpdateAmountModal, setShowUpdateAmountModal] = useState<boolean>(false);
    const [showUpdatePaymentDateModal, setShowUpdatePaymentDateModal] = useState<boolean>(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { editPurchasePayment, editSubscriptionPayment, deleteSubscriptionPayment } = useWalletMigrations();
    const installment = expense.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';

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

    const handleDeleteSubscriptionPayment = () => {
        deleteSubscriptionPayment(payment.expenseId, payment.id);
    };

    const onDeleteClick = () => {
        setShowDeleteDialog(true);
    };

    const fontStyle: React.CSSProperties | undefined =
        payment.expenseType === ExpenseTypeEnum.PURCHASE && payment.noInstallment === expense?.installments
            ? {
                  color: 'green',
                  fontWeight: 'bold',
              }
            : undefined;

    return (
        <>
            <StyledTableRow>
                <StyledTableCell align='right' style={fontStyle}>
                    {formatCurrency(payment.amount)}{' '}
                </StyledTableCell>
                <StyledTableCell align='right' style={fontStyle}>{installment}</StyledTableCell>
                <StyledTableCell align='right' style={fontStyle}>{payment.month}/{payment.year}</StyledTableCell>
                <StyledTableCell align='right' style={fontStyle}>
                    {getPaymentStatusIcon(payment.status)}{' '}
                </StyledTableCell>
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
                            <Button color='info' onClick={() => onDeleteClick()}>
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
            {showDeleteDialog && (
                <AgreeActionDialog
                    open={showDeleteDialog}
                    title={`Confirma borrar el gasto "${payment.expenseTitle}" de ${formatCurrency(payment.amount)}?`}
                    handleAgree={handleDeleteSubscriptionPayment}
                    handleClose={() => setShowDeleteDialog(false)}
                    description='Esta acción no se puede deshacer.'
                />
            )}
        </>
    );
};
