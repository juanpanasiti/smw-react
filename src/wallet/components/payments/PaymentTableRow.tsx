import { Done, DoneAll, MonetizationOn, QuestionMark } from '@mui/icons-material';
import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { PaymentUpdateAmountDialog } from './PaymentUpdateAmountDialog';
import { useModal, useWallet } from '../../hooks';
import { Payment } from '../../../store/interfaces';
import { PaymentStatusEnum } from '../../types/enums';
import { getPaymentStatusIcon } from '../../helpers';
import { cleanPaymentToForm, parseCurrency } from '../../api/helpers';

interface Props {
    payment: Payment;
    hideTitle?: boolean;
    hidePeriod?: boolean;
}
export const PaymentTableRow = ({ payment, hideTitle = false, hidePeriod = true }: Props) => {
    //? const installment: string =
    //? 	expense?.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
    const { updatePaymentAmount, updatePaymentStatus, createNewSubscriptionPayment } = useWallet();
    const statusIcon = getPaymentStatusIcon(payment.status);
    const handleUpdateStatusPayment = (data: Partial<Payment>) => {
        updatePaymentStatus({ ...payment, ...data });
    };
    const handleUpdateAmountPayment = (data: Partial<Payment>) => {
        updatePaymentAmount({ ...payment, ...data });
    };
    const handleCreateSubscriptionPayment = () => {
        createNewSubscriptionPayment(cleanPaymentToForm(payment));
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
                                onClick={() => handleUpdateStatusPayment({ status: PaymentStatusEnum.UNCONFIRMED })}
                            >
                                <QuestionMark />
                            </Button>
                            <Button
                                color='warning'
                                disabled={payment.status === PaymentStatusEnum.CONFIRMED}
                                variant='outlined'
                                onClick={() => handleUpdateStatusPayment({ status: PaymentStatusEnum.CONFIRMED })}
                            >
                                <Done />
                            </Button>
                            <Button
                                color='success'
                                disabled={payment.status === PaymentStatusEnum.PAID}
                                variant='outlined'
                                onClick={() => handleUpdateStatusPayment({ status: PaymentStatusEnum.PAID })}
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
                            handleUpdate={handleUpdateAmountPayment}
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
