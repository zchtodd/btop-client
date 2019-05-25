import React from "react";
import "./Meter.css";

export default class Meter extends React.Component {
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-1">
                            <div className="meter-text">{this.props.label}</div>
                        </div>
                        <div className="col-9">
                            <div className="meter-capacity">
                                <div
                                    className="meter-utilized"
                                    style={{
                                        width: this.props.perc + "%"
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-2" style={{"text-align": "right"}}>
                            <div className="meter-text">
                                {this.props.utilized} / {this.props.capacity}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
