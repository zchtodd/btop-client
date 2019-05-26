import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React from "react";

import CPUGrid from "./CPUGrid.js";
import Meter from "./Meter.js";
import ProcessList from "./ProcessList.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cpus: [],
            mem: { used: 0, total: 0, perc: 0 },
            swp: { used: 0, total: 0, perc: 0 },
            add: [],
            update: [],
            remove: []
        };
    }

    componentDidMount() {
        let ws = new WebSocket("ws://" + window.location.hostname + ":5678");
        ws.onmessage = event => {
            let data = JSON.parse(event.data);

            this.setState({
                cpus: data.cpu,
                mem: data.mem,
                swp: data.swp,
                add: data.add,
                update: data.update,
                remove: data.remove
            });
        };
    }

    render() {
        return (
            <div id="app-container">
                <div>
                    <CPUGrid cpus={this.state.cpus} />
                </div>
                <div className="mx-auto w-75 mt-5">
                    <Meter
                        label="mem"
                        className="standard"
                        utilized={this.state.mem.used}
                        capacity={this.state.mem.total}
                        perc={this.state.mem.perc}
                    />
                </div>
                <div className="mx-auto w-75 mt-3">
                    <Meter
                        label="swp"
                        className="warning"
                        utilized={this.state.swp.used}
                        capacity={this.state.swp.total}
                        perc={this.state.swp.perc}
                    />
                </div>
                <div id="proclist-container" className="mt-4">
                    <ProcessList
                        add={this.state.add}
                        update={this.state.update}
                        remove={this.state.remove}
                    />
                </div>
            </div>
        );
    }
}
