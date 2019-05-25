import React from "react";
import "./SwapMeter.css";

export default class Meter extends React.Component {
    render() {
        return (
            <div>
                <svg viewBox="0 0 1200 100" preserveAspectRatio="none" className="swap-meter">
                    <rect
                        x="0"
                        y="0"
                        width="1000"
                        height="100"
                        className="meter-capacity"
                    />
                    <rect
                        x="0"
                        y="0"
                        width={1000 * this.props.swp.perc / 100}
                        height="10"
                        className="meter-utilized"
                    />
                    <text x="1100" y="50" lengthAdjust="spacingAndGlyphs" className="meter-text">
                        {this.props.swp.used} / {this.props.swp.total}
                    </text>
                </svg>
            </div>
        );
    }
}
