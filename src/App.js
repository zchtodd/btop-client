import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React from "react";

import CPUGrid from "./CPUGrid.js";
import Meter from "./Meter.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cpus: [],
            mem: {},
            swp: { perc: 0 },
            processes: [],
            uptime: 0
        };
    }

    componentDidMount() {
        let ws = new WebSocket("ws://" + window.location.hostname + ":5678");
        ws.onmessage = event => {
            let data = JSON.parse(event.data);

            let updated = data.updated.reduce((updated, proc) => {
                updated[proc.pid] = proc;
                return updated;
            }, {});

            let removed = data.removed.reduce((removed, proc) => {
                removed[proc.pid] = proc;
                return removed;
            }, {});

            let processes = this.state.processes.filter(
                proc => !removed[proc.pid]
            );

            processes = processes.map(proc => {
                return updated[proc.pid] ? updated[proc.pid] : proc;
            });

            if (!processes.length) {
                processes = data.updated;
            }

            this.setState({
                cpus: data.cpu,
                mem: data.mem,
                swp: data.swp,
                processes: processes
            });
        };
    }

    render() {
        return (
            <div>
                <div>
                    <CPUGrid cpus={this.state.cpus} />
                </div>
                <div className="mem-meter-container ml-4 mt-4">
                    <Meter
                        label="mem"
                        utilized={this.state.mem.used}
                        capacity={this.state.mem.total}
                        perc={this.state.mem.perc}
                    />
                </div>
                <div className="swp-meter-container ml-4 mt-4">
                    <Meter
                        label="swp"
                        utilized={this.state.swp.used}
                        capacity={this.state.swp.total}
                        perc={this.state.swp.perc}
                    />
                </div>
            </div>
        );
    }
}
