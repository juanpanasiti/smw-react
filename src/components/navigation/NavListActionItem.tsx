import { ListItem, MuiIcon } from '../shared';

interface Props {
    Icon: MuiIcon;
    label: string;
    handleClick: () => void;
}
export const NavListActionItem = ({ handleClick, ...rest }: Props) => {
    return (
        <a onClick={handleClick} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem {...rest} />
        </a>
    );
};
