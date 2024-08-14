import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { Sidebar } from '../components/navigation';

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    const { pathname } = useLocation();
    useEffect(() => {
        localStorage.setItem('lastPath', pathname);
    }, [pathname]);
    return (
        <>
            <div className='main-layout'>
                <Sidebar />
                <main className='main-section'>{children}</main>
            </div>
        </>
    );
};
