import { ListItemButton, ListItemIcon, ListItemText, ListItem as MuiListItem } from '@mui/material';

import { MuiIcon } from '.';

interface Props {
    Icon: MuiIcon;
    label: string;
}
export const ListItem = ({ Icon, label }: Props) => {
    return (
        <MuiListItem disablePadding>
            <ListItemButton sx={{ overflow: 'hidden' }}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                />
            </ListItemButton>
        </MuiListItem>
    );
};
