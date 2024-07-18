interface Props {
    children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
    return (
        <>
            <main>
                {/* TODO: refactor */}
                {children}
            </main>
        </>
    );
};
