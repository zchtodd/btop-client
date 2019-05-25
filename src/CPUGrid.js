import React from "react";
import Gauge from "./Gauge.js";

export default class CPUGrid extends React.Component {
    createGrid = () => {
        let grid = [];
        for (let i = 0; i < Math.ceil(this.props.cpus.length / 4); i++) {
            let row = [];
            for (let j = 0; j < 4; j++) {
                let index = i * 4 + j;
                row.push(
                    <div className="col-sm-3">
                        <Gauge
                            cpu_num={index + 1}
                            perc={this.props.cpus[index]}
                        />
                    </div>
                );
            }
            grid.push(<div className="row mb-2">{row}</div>);
        }
        return grid;
    };

    render() {
        return <div className="container-fluid">{this.createGrid()}</div>;
    }
}
