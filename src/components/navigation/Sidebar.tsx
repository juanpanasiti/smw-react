import { Button, ButtonGroup, Paper, SxProps, Theme } from '@mui/material';
import { Menu, MenuOpen, Dashboard, CreditCard, RequestQuote, Logout, Settings } from '@mui/icons-material';
import { useState } from 'react';
import { IconAnimated } from '../shared';

const sxButton: SxProps<Theme> = {
    justifyContent: 'flex-start',
    gap: 1,
    paddingLeft: '1rem',
};
export const Sidebar = () => {
    const [onlyIcons, setOnlyIcons] = useState<boolean>(true);
    const width = onlyIcons ? '48px' : '240px';

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
                backgroundColor: '#101010'
            }}
        >
            <IconAnimated value={onlyIcons} handleClick={() => setOnlyIcons(!onlyIcons)} FirstIcon={Menu} SecondIcon={MenuOpen} />
            <ButtonGroup orientation='vertical' aria-label='Vertical button group' variant='text' fullWidth sx={{flexGrow:'1', margin: '1rem 0rem'}}>
                <Button startIcon={<Dashboard />} size='large' sx={sxButton}>
                    Dashboard
                </Button>
                <Button startIcon={<CreditCard />} size='large' sx={sxButton}>
                    Gastos
                </Button>
                <Button startIcon={<RequestQuote />} size='large' sx={sxButton}>
                    Pagos
                </Button>
            </ButtonGroup>
            <ButtonGroup orientation='vertical' aria-label='Vertical button group' variant='text' fullWidth>
                <Button startIcon={<Settings />} size='large' sx={sxButton}>
                    Configuración
                </Button>
                <Button startIcon={<Logout />} size='large' sx={sxButton}>
                    Logout
                </Button>
            </ButtonGroup>
        </Paper>
    );
};
