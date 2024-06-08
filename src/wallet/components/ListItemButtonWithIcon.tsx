import React from 'react';

import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { SmwRoutes } from '../enums';

interface Props {
	primary: string;
	secondary?: string;
	icon: React.ReactNode;
	pathTo: SmwRoutes;
}
export const ListItemButtonWithIcon = ({ primary, secondary, icon, pathTo }: Props) => {
	return (
		<ListItem disablePadding>
			<ListItemButton component={NavLink} to={pathTo}>
				<ListItemIcon>{icon}</ListItemIcon>
				<Grid container>
					<ListItemText primary={primary} />
					{secondary && <ListItemText secondary={secondary} />}
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
