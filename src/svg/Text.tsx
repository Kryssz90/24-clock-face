import React from "react";

interface Props {
    r: number;
    angle: number;
    fontSize?: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
}


export const Text = ({ r, angle, children, fontSize = 8, stroke, strokeWidth, fill }: React.PropsWithChildren<Props>) => {
    const x = 50 - r * 50 * Math.sin(angle * Math.PI / 180);
    const y = 50 + r * 50 * Math.cos(angle * Math.PI / 180);
    return (
        <text textAnchor="middle" x={x} y={y} dy={fontSize / 3} fontSize={fontSize} stroke={stroke} strokeWidth={strokeWidth} fill={fill}>{children}</text>
    );
}
