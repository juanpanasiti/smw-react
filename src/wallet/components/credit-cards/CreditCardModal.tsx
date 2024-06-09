import { Box, Modal, SxProps, Theme, Typography } from '@mui/material';
import { CreditCardForm } from './CreditCardForm';
import { CreditCardMain } from '../../../store/interfaces';
import { parseCreditCardMainToForm } from '../../api/helpers';

interface Props {
	open: boolean;
	handleOpen: () => void;
	style?: SxProps<Theme>;
	creditCard?: CreditCardMain;
}
export const CreditCardModal = ({ open, handleOpen, style = {}, creditCard }: Props) => {
	const defaultStyle: SxProps<Theme> = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const title = creditCard?.id ? `Edit ${creditCard?.alias}` : 'New Credit Card';

	return (
		<Modal
			open={open}
			onClose={handleOpen}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={{ ...defaultStyle, ...style }}>
				<Typography id='modal-modal-title' variant='h5'>
					{title}
				</Typography>
				<CreditCardForm creditCard={creditCard && parseCreditCardMainToForm(creditCard)} afterSubmit={handleOpen} />
			</Box>
		</Modal>
	);
};
