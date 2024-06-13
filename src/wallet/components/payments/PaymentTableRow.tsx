import { Done, DoneAll, MonetizationOn, QuestionMark } from '@mui/icons-material';
import { Button, ButtonGroup, TableCell, TableRow } from '@mui/material';
import { PaymentUpdateAmountDialog } from './PaymentUpdateAmountDialog';
import { useModal } from '../../hooks';
import { Payment } from '../../../store/interfaces';
import { PaymentStatusEnum } from '../../types/enums';
import { getPaymentStatusIcon } from '../../helpers';
import { parseCurrency } from '../../api/helpers';
import { useWallet } from '../../../hooks';

interface Props {
	payment: Payment;
	hideTitle?: boolean;
	hidePeriod?: boolean;
}
export const PaymentTableRow = ({ payment, hideTitle = false, hidePeriod = true }: Props) => {
	// const installment: string =
	// 	expense?.type === ExpenseTypeEnum.PURCHASE ? `${payment.noInstallment}/${expense?.installments}` : '---';
	const {updatePaymentStatusMutation, updatePaymentAmountMutation} = useWallet()
	const statusIcon = getPaymentStatusIcon(payment.status);
	const handleUpdateStatusPayment = (data: Partial<Payment>) => {
		updatePaymentStatusMutation.mutate({...payment, ...data});
	};
	const handleUpdateAmountPayment = (data: Partial<Payment>) => {
		updatePaymentAmountMutation.mutate({...payment, ...data});
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
			</TableCell>
		</TableRow>
	);
};
