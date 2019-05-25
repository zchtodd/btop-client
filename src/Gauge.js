import React from "react";
import "./Gauge.css";

export default class Gauge extends React.Component {
    render() {
        return (
            <div>
                <svg viewBox="0 0 100 100" className="gauge">
                    <text x="4" y="50" className="gauge-text">
                        {this.props.cpu_num}
                    </text>
                    <circle
                        cx="50"
                        cy="100"
                        r="45"
                        className="gauge-capacity"
                    />
                    <circle
                        cx="50"
                        cy="100"
                        r="45"
                        className="gauge-utilized"
                        stroke-dashoffset={142 - (141 * this.props.perc) / 100}
                    />
                    <text
                        x="50"
                        y="90"
                        text-anchor="middle"
                        className="gauge-text"
                    >
                        {this.props.perc.toFixed(1)}%
                    </text>
                </svg>
            </div>
        );
    }
}
