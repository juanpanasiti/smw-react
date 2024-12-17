import { NavLink } from 'react-router';

import { ListItem, MuiIcon } from '../shared';

interface Props {
    Icon: MuiIcon;
    to: string;
    label: string;
}
export const NavListItem = ({ to, ...rest }: Props) => {
    return (
        <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem {...rest} />
        </NavLink>
    );
};
