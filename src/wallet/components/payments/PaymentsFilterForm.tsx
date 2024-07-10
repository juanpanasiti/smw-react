import { Grid, MenuItem, TextField } from '@mui/material';
import { CreditCardSimpleItem } from '../../../store/interfaces';
import { PaymentStatusEnum } from '../../types/enums';

interface Props {
    creditCards: CreditCardSimpleItem[];
    textFilter: string;
    // creditCardId: string;
    paymentStatus: PaymentStatusEnum | 'any';
    setTextFilter: (value: string) => void;
    // setCreditCardId: (value: string) => void;
    setPaymentStatus: (value: PaymentStatusEnum | 'any') => void;
}
export const PaymentsFilterForm = (props: Props) => {
    const { textFilter, paymentStatus, setTextFilter, setPaymentStatus } = props;
    // const defaultCreditCardId = creditCardId || 'any';
    const defaultPaymentStatus = paymentStatus || 'any';

    const onTextFilterChange = (text: string) => {
        setTextFilter(text);
    };
    // const onCreditCardIdChange = (ccId: string) => {
    // 	setCreditCardId(ccId === 'any' ? '' : ccId);
    // };
    const onPaymentStatusChange = (status: PaymentStatusEnum | 'any') => {
        setPaymentStatus(status);
    };
    return (
        <Grid container spacing={2} sx={{ my: 1 }}>
            <Grid item xs={6}>
                <TextField
                    label='Filter'
                    fullWidth
                    autoComplete='off'
                    variant='outlined'
                    defaultValue={textFilter}
                    onChange={(e) => onTextFilterChange(e.target.value)}
                />
            </Grid>
            {/* <Grid item xs={3}>
				<TextField
					select
					label='Select'
					defaultValue={defaultCreditCardId}
					fullWidth
					onChange={(e) => onCreditCardIdChange(e.target.value)}
				>
					<MenuItem value='any'>Any</MenuItem>
					{creditCards.map((option) => (
						<MenuItem key={option.id} value={option.id}>
							{option.alias}
						</MenuItem>
					))}
				</TextField>
			</Grid> */}
            <Grid item xs={3}>
                <TextField
                    select
                    label='Select'
                    defaultValue={defaultPaymentStatus}
                    fullWidth
                    onChange={(e) => onPaymentStatusChange(e.target.value as PaymentStatusEnum | 'any')}
                >
                    <MenuItem value='any'>Any</MenuItem>
                    <MenuItem value={PaymentStatusEnum.UNCONFIRMED}>Unconfirmed</MenuItem>
                    <MenuItem value={PaymentStatusEnum.CONFIRMED}>Confirmed</MenuItem>
                    <MenuItem value={PaymentStatusEnum.PAID}>Paid</MenuItem>
                </TextField>
            </Grid>
        </Grid>
    );
};
