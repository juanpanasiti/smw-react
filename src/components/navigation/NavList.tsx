import { List } from '@mui/material';

interface Props {
    children: React.ReactNode;
}
export const NavList = ({ children }: Props) => {
    return (
        <nav style={{ width: '100%' }}>
            <List>{children}</List>
        </nav>
    );
};
