import { Done, DoneAll, Block, QuestionMark, Pending } from '@mui/icons-material';

import { PaymentStatusEnum } from '../types';

export const getPaymentStatusIcon = (status: PaymentStatusEnum) => {
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