import React from 'react';

import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

interface Props {
	primary: string;
	secondary?: string;
	icon: React.ReactNode;
	callback: () => void;
}
export const ListItemActionButtonWithIcon = ({ primary, secondary, icon, callback }: Props) => {
	return (
		<ListItem disablePadding>
			<ListItemButton  onClick={callback}>
				<ListItemIcon>{icon}</ListItemIcon>
				<Grid container>
					<ListItemText primary={primary} />
					{secondary && <ListItemText secondary={secondary} />}
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
