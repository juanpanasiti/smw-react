import { Done, DoneAll, MonetizationOn, QuestionMark } from '@mui/icons-material';
import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';

import { Payment, PaymentStatusEnum } from '../../types';
import { getPaymentStatusIcon, parseCurrency } from '../../helpers';
import { useModal, useWallet } from '../../hooks';
import { PaymentUpdateAmountDialog } from './PaymentUpdateAmountDialog';

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
    const handleUpdatePayment = (data: Partial<Payment>) => {
        updatePayment({ ...payment, ...data });
    };

    const handleCreateSubscriptionPayment = () => {
        createNewSubscriptionPayment((payment));
    };
    const { open: openModalDialog, handleOpen: handleOpenModalDialog } = useModal();
    const period = `${payment.month}-${payment.year}`.padStart(7, '0');
    return (
        <TableRow key={payment.id}>
            {!hideTitle && <TableCell>{payment.expenseTitle}</TableCell>}
            <TableCell>{parseCurrency(payment.amount)}</TableCell>
            {!hidePeriod && <TableCell>{period}</TableCell>}
            <TableCell>{payment.noInstallment}</TableCell>
            <TableCell>{statusIcon}</TableCell>
            <TableCell>
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
            </TableCell>
        </TableRow>
    );
};
