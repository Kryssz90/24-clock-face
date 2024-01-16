import React from "react";

interface Props {
    children: React.ReactNode;
    fill?: string;
}


export const Svg = ({ children, fill }: React.PropsWithChildren<Props>) => {
    return (
        <svg width="100vw" height="100vh" viewBox="0 0 100 100" style={{ backgroundColor: fill }}>
            {children}
        </svg>
    );
}