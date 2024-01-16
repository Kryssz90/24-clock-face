import React from "react";
import { Line } from "./Line";

interface Props {
    r1: number;
    r2: number;
    angle: number;
    strokeColor?: string;
    strokeWidth: number;
    fillColor?: string;
    thickness: number;
}

export const OutlinedLine = ({ r1, r2, angle, strokeColor, strokeWidth, fillColor, thickness }: Props) => {
    return (
        <>
            <Line r1={r1} r2={r2} angle={angle} stroke={strokeColor} strokeWidth={thickness + strokeWidth} />
            <Line r1={r1} r2={r2} angle={angle} stroke={fillColor} strokeWidth={thickness} />
        </>
    );
}