import React from "react";
import { CSSProperties} from "react";

export interface ProgressBarProps {
    percentage: number;
    colour: string
}

export default function ProgressBar({ percentage, colour }: ProgressBarProps): React.ReactElement {
    const containerStyles = {
        height: 20,
        width: '90%',
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50
    }

    const fillerStyles: CSSProperties = {
        height: '100%',
        width: `${percentage}%`,
        backgroundColor: `${colour}`,
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
    }
    
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>
                    {`${Math.round(percentage)}%`}
                </span>
            </div>
        </div>
    )
}