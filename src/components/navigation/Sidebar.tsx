import { useState } from 'react';

import { Divider, Paper } from '@mui/material';
import { Menu, MenuOpen, Dashboard, CreditCard, RequestQuote, Logout, Settings } from '@mui/icons-material';

import { IconAnimated } from '../shared';
import { NavList } from './NavList';
import { NavListItem } from './NavListItem';
import { NavListActionItem } from './NavListActionItem';
import { useAuth } from '../../hooks/useAuth';
import { loadExpandMenu, saveExpandMenu } from '../../helpers';

export const Sidebar = () => {
    const [expandMenu, setExpandMenu] = useState<boolean>(loadExpandMenu());
    const { logout } = useAuth();
    const width = expandMenu ? '240px' : '48px';

    const toggleMenu = () => {
        setExpandMenu(!expandMenu);
        saveExpandMenu(!expandMenu);
    };

    return (
        <Paper
            elevation={3}
            sx={{
                width,
                padding: '1rem 0rem',
                overflow: 'hidden',
                transition: 'width 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                backgroundColor: '#101010',
            }}
        >
            <IconAnimated value={expandMenu} handleClick={toggleMenu} FirstIcon={Menu} SecondIcon={MenuOpen} />
            <NavList>
                <NavListItem Icon={Dashboard} to='/' label='Dashboard' />
                <NavListItem Icon={CreditCard} to='/expenses' label='Gastos' />
                <NavListItem Icon={RequestQuote} to='/statements' label='Pagos' />
            </NavList>
            <Divider sx={{ flexGrow: '1' }} />
            <NavList>
                <NavListItem Icon={Settings} to='/' label='Configuración' />
                <NavListActionItem Icon={Logout} label='Cerrar Sesión' handleClick={() => logout()} />
            </NavList>
        </Paper>
    );
};
