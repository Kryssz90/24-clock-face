import React from "react";

interface Props {
    r: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
}

export const Circle = ({ r, stroke, strokeWidth, fill }: Props) => {
    return (
        <circle cx="50" cy="50" r={r * 50} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
    );
}
