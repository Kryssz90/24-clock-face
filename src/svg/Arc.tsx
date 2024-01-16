import React from 'react'

interface Props {
    r0: number;
    r1: number;
    angle0: number;
    angle1: number;
    stroke?: string;
    strokeWidth?: number;
    fill?: string;
}

export const Arc = ({ r0, r1, angle0, angle1, stroke, strokeWidth, fill }: Props) => {
    const x0 = 50 - r0 * 50 * Math.sin(angle0 * Math.PI / 180);
    const y0 = 50 + r0 * 50 * Math.cos(angle0 * Math.PI / 180);
    const x1 = 50 - r1 * 50 * Math.sin(angle0 * Math.PI / 180);
    const y1 = 50 + r1 * 50 * Math.cos(angle0 * Math.PI / 180);
    const x2 = 50 - r1 * 50 * Math.sin(angle1 * Math.PI / 180);
    const y2 = 50 + r1 * 50 * Math.cos(angle1 * Math.PI / 180);
    const x3 = 50 - r0 * 50 * Math.sin(angle1 * Math.PI / 180);
    const y3 = 50 + r0 * 50 * Math.cos(angle1 * Math.PI / 180);
    const largeArc = angle1 - angle0 > 180 ? 1 : 0;
    return (
        <path d={`M ${x0} ${y0} L ${x1} ${y1} A ${r1 * 50} ${r1 * 50} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${r0 * 50} ${r0 * 50} 0 ${largeArc} 0 ${x0} ${y0}`} stroke={stroke} strokeWidth={strokeWidth} fill={fill} />
    );
}