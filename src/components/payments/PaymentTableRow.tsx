import { Done, DoneAll, MonetizationOn, QuestionMark } from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material';

import { ExpenseTypeEnum, Payment, PaymentStatusEnum } from '../../types';
import { getPaymentStatusIcon, parseCurrency } from '../../helpers';
import { useModal, useWallet } from '../../hooks';
import { PaymentUpdateAmountDialog } from './PaymentUpdateAmountDialog';
import { StyledTableRow } from '../common/StyledTableRow';
import { StyledTableCell } from '../common';

interface Props {
    payment: Payment;
    hideTitle?: boolean;
    hidePeriod?: boolean;
}
export const PaymentTableRow = ({ payment, hideTitle = false, hidePeriod = true }: Props) => {
    //? const installment: string =
    //? 	expense?.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
    const { updatePayment, createNewSubscriptionPayment } = useWallet();
    const statusIcon = getPaymentStatusIcon(payment.status);
    const installments = payment.expenseType === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${payment.expenseNoInstallments}` : '---';
    const handleUpdatePayment = (data: Partial<Payment>) => {
        updatePayment({ ...payment, ...data });
    };

    const handleCreateSubscriptionPayment = () => {
        createNewSubscriptionPayment(payment);
    };
    const { open: openModalDialog, handleOpen: handleOpenModalDialog } = useModal();
    const period = `${payment.month}-${payment.year}`.padStart(7, '0');
    /* 
    TODO: Agregar a payment info de la TC y el expense, utilizar el title como button para mostrar un modal con toda la info de
    la TC y el expense correspondiente, en la columna installment mostrar n/m si es de un purchase y resaltar las ultimas cuotas
     */
    const rowStyle: React.CSSProperties = {
        fontWeight: payment.noInstallment === payment.expenseNoInstallments ? 'bolder' : 'normal',
        color: payment.noInstallment === payment.expenseNoInstallments ? 'green' : 'inherit',
    };
    return (
        <StyledTableRow key={payment.id} style={rowStyle}>
            <StyledTableCell>{payment.expenseAcquiredAt}</StyledTableCell>
            {!hideTitle && <StyledTableCell>{payment.expenseTitle}</StyledTableCell>}
            <StyledTableCell>{parseCurrency(payment.amount)}</StyledTableCell>
            {!hidePeriod && <StyledTableCell>{period}</StyledTableCell>}
            <StyledTableCell>{installments}</StyledTableCell>
            <StyledTableCell>{statusIcon}</StyledTableCell>
            <StyledTableCell>
                {payment.status !== PaymentStatusEnum.SIMULATED ? (
                    <>
                        <ButtonGroup>
                            <Button
                                color='error'
                                disabled={payment.status === PaymentStatusEnum.UNCONFIRMED}
                                variant='outlined'
                                onClick={() => handleUpdatePayment({ status: PaymentStatusEnum.UNCONFIRMED })}
                            >
                                <QuestionMark />
                            </Button>
                            <Button
                                color='warning'
                                disabled={payment.status === PaymentStatusEnum.CONFIRMED}
                                variant='outlined'
                                onClick={() => handleUpdatePayment({ status: PaymentStatusEnum.CONFIRMED })}
                            >
                                <Done />
                            </Button>
                            <Button
                                color='success'
                                disabled={payment.status === PaymentStatusEnum.PAID}
                                variant='outlined'
                                onClick={() => handleUpdatePayment({ status: PaymentStatusEnum.PAID })}
                            >
                                <DoneAll />
                            </Button>
                            <Button color='info' onClick={handleOpenModalDialog}>
                                <MonetizationOn />
                            </Button>
                        </ButtonGroup>
                        <PaymentUpdateAmountDialog
                            payment={payment}
                            handleClose={handleOpenModalDialog}
                            open={openModalDialog}
                            handleUpdate={handleUpdatePayment}
                        />
                    </>
                ) : (
                    <>
                        <ButtonGroup>
                            <Button color='warning' variant='outlined' onClick={handleCreateSubscriptionPayment}>
                                <QuestionMark />
                            </Button>
                        </ButtonGroup>
                    </>
                )}
            </StyledTableCell>
        </StyledTableRow>
    );
};
