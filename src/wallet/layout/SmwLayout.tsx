import { Box, Toolbar } from '@mui/material';
import { Sidebar } from '../components';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
	children: React.ReactNode;
}

const drawerWidth = 240;

export const SmwLayout = ({ children }: Props) => {
	

	const { pathname } = useLocation();
	useEffect(() => {
		localStorage.setItem('lastPath', pathname);
	}, [pathname]);
	return (
		<Box sx={{ display: 'flex', height: '100vh' }}>
			<Sidebar drawerWidth={drawerWidth} /> 

			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};
