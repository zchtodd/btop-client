import React from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-dark.css";

import { memfmt } from "./Utility.js";

export default class ProcessList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gridOptions: {
                getRowNodeId: data => data.pid,
                defaultColDef: {
                    filter: true,
                    sortable: true
                }
            },
            columnDefs: [
                { headerName: "PID", field: "pid", maxWidth: 80 },
                { headerName: "User", field: "username", maxWidth: 100 },
                { headerName: "NI", field: "nice", maxWidth: 60 },
                {
                    headerName: "RSS",
                    valueGetter: params => params.data.memory_info[0],
                    valueFormatter: params => memfmt(params.value),
                    cellStyle: { textAlign: "right" },
                    maxWidth: 80
                },
                {
                    headerName: "VMS",
                    valueGetter: params => params.data.memory_info[1],
                    valueFormatter: params => memfmt(params.value),
                    cellStyle: { textAlign: "right" },
                    maxWidth: 80
                },
                {
                    headerName: "SHR",
                    valueGetter: params => params.data.memory_info[2],
                    valueFormatter: params => memfmt(params.value),
                    cellStyle: { textAlign: "right" },
                    maxWidth: 80
                },
                { headerName: "Status", field: "status", maxWidth: 80 },
                {
                    headerName: "CPU%",
                    field: "cpu_percent",
                    cellStyle: { textAlign: "right" },
                    maxWidth: 110
                },
                {
                    headerName: "MEM%",
                    field: "memory_percent",
                    cellStyle: { textAlign: "right" },
                    maxWidth: 110
                },
                { headerName: "Time+", field: "time", maxWidth: 80 },
                { headerName: "Command", field: "cmdline" }
            ]
        };
    }

    componentDidUpdate() {
        if (this.gridApi) {
            this.gridApi.updateRowData({
                add: this.props.add,
                update: this.props.update,
                remove: this.props.remove
            });
            this.gridApi.sizeColumnsToFit();
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
    }

    render() {
        return (
            <div
                className="ag-theme-dark"
                style={{ width: "100%", height: "100%" }}
            >
                <AgGridReact
                    onGridReady={this.onGridReady.bind(this)}
                    gridOptions={this.state.gridOptions}
                    columnDefs={this.state.columnDefs}
                />
            </div>
        );
    }
}
