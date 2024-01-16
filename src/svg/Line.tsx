import React from "react";

interface Props {
    r1: number;
    r2: number;
    angle: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
}

export const Line = ({ r1, r2, angle, stroke, strokeWidth, fill }: Props) => {
    const x1 = 50 - r1 * 50 * Math.sin(angle * Math.PI / 180);
    const y1 = 50 + r1 * 50 * Math.cos(angle * Math.PI / 180);
    const x2 = 50 - r2 * 50 * Math.sin(angle * Math.PI / 180);
    const y2 = 50 + r2 * 50 * Math.cos(angle * Math.PI / 180);
    return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
    );
}