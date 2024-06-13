import { Done, DoneAll, QuestionMark } from '@mui/icons-material';
import { PaymentStatusEnum } from '../types/enums';

export const getPaymentStatusIcon = (status: PaymentStatusEnum) => {
	switch (status) {
		case PaymentStatusEnum.UNCONFIRMED:
			return <QuestionMark color='error' />;
		case PaymentStatusEnum.CONFIRMED:
			return <Done color='warning' />;
		case PaymentStatusEnum.PAID:
			return <DoneAll color='success' />;
		default:
			return <QuestionMark color='error' />;
	}
};
