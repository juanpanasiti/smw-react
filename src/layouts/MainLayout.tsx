import { Sidebar } from '../components/navigation';

interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return (
        <>
            <main>
                <div className='main-layout'>
                    <Sidebar />
                    {children}
                </div>
            </main>
        </>
    );
};
