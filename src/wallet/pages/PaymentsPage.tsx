import { Alert, AlertTitle, Box, Divider, Typography } from '@mui/material';
import { PeriodStatusEnum } from '../types/enums';
import { PeriodList } from '../components/payments';
import { usePayments } from '../hooks';

export const PaymentsPage = () => {
	const { periods } = usePayments()
	const pendingOnes =  periods.filter((period) => period.status === PeriodStatusEnum.PENDING);
	const paidOnes = periods.filter((period) => period.status === PeriodStatusEnum.PAID);
	return (
		<Box>
			<Typography variant='h2'>Payments</Typography>
			<Divider>
				<Typography variant='h4'>Payments Pending</Typography>
			</Divider>
			{pendingOnes.length === 0 ? (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no expenses to show!
				</Alert>
			):
			<PeriodList periods={pendingOnes} />
		}

			<Divider>
				<Typography variant='h4'>Payments Done</Typography>
			</Divider>
			{paidOnes.length === 0 && (
				<Alert severity='info'>
					<AlertTitle>Nothing to show</AlertTitle>
					There are no expenses to show!
				</Alert>
			)}
			<PeriodList periods={paidOnes} />
		</Box>
	);
};
