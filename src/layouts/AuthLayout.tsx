import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const AuthLayout = ({ children }: Props) => {
    return (
        <>
            <section>{children}</section>
        </>
    );
};
