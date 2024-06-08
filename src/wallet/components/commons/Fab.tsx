import { Fab as MuiFab, SxProps } from '@mui/material';

interface Props {
	icon: React.ReactNode;
	handleClick: () => void;
	style?: SxProps;
	label?: string;
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}
export const Fab = ({ icon, style = {}, label='', handleClick, color = 'primary' }: Props) => {
	const fabStyle: SxProps = {
		position: 'absolute',
		bottom: 25,
		right: 25,
		...style,
	};

	const fab = {
		icon,
		label,
	};
	return (
		<MuiFab sx={fabStyle} aria-label={fab.label} color={color} onClick={handleClick}>
			{fab.icon}
		</MuiFab>
	);
};
