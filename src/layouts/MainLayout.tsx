import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { styled } from 'styled-components';
import { Sidebar } from '../components/navigation';
import { Paper } from '@mui/material';

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    const { pathname } = useLocation();
    useEffect(() => {
        localStorage.setItem('lastPath', pathname);
    }, [pathname]);
    return (
        <ContainerFake className='main-layout'>
            <Sidebar />

            <Paper
                elevation={3}
                sx={{
                    padding: '1rem 1.5rem',
                    width: '100%',
                    minHeight: '100vh',
                    marginLeft: '0.5rem',
                }}
            >
                {children}
            </Paper>
        </ContainerFake>
    );
};

const ContainerFake = styled.div`
    width: 100%;
    display: flex;
`;
