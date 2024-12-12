import { NavLink } from 'react-router';

import { MuiIcon } from '../shared';
import { ListItem } from '../shared/ListItem';

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
