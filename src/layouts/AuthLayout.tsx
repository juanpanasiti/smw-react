import React from 'react';

interface Props {
    children: React.ReactNode;
    title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
    return (
        <>
            <h1>{title}</h1>
            <hr />
            <section>{children}</section>
        </>
    );
};
