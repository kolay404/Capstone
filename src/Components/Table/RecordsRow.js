import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from "@mui/material";
import { useRecordsContext } from '../../Context/RecordsProvider';

function RecordsRow(props) {
    const [editingCell, setEditingCell] = useState({ colId: null, rowId: null });
    const [inputValue, setInputValue] = useState('Initial Value');
    const [rows, setRows] = useState([
        {
            id: 1,
            date: 'oten',
            details_code: 'testing',
            details: 'testing',
            lastUpdated: 'testing',
            hours: 'testing',
            amount: 100
        },
        {
            id: 2,
            date: 'oten',
            details_code: 'boto',
            details: 'testing',
            lastUpdated: 'testing',
            hours: 'testing',
            amount: 150
        }
    ]);

    const appendRow = (newRow) => {
        setRows(prevRows => [...prevRows, newRow]);
    };

    let newRecord = {
        id: 3,
        date: 'oten2',
        details_code: 'testing2',
        details: 'testing2',
        lastUpdated: 'testing2',
        hours: 'testing2',
        amount: 100
    }

    useEffect(() => {
        appendRow(newRecord)
        console.log(rows)
    }, [])

    const handleCellClick = (colId, rowId) => {
        setEditingCell({ colId, rowId });
        console.log('row Id: ' + rowId + " and col Id: " + colId)
    };

    const handleInputChange = (colId, rowId, event) => {
        const updatedRows = [...rows];
        updatedRows[rowId - 1][colId] = event.target.value;
        setRows(updatedRows);
        setInputValue(rows[rowId - 1][colId]);
    };

    const handleInputBlur = () => {
        setEditingCell(null);
        // Perform any action when input is blurred (e.g., save the value)
        console.log('Value saved:', inputValue);
    };

    const conditionRow = (props) => {
        if (props.lastUpdated == null) {
            return (
                <>
                    <img alt="" src={"http://localhost:8080/download/uid/" + props.id} style={{ height: "45px", width: "45px" }} />
                    <div style={{
                        display: "inline-block",
                        paddingLeft: "10px",
                        verticalAlign: "top",
                        marginTop: "15px"
                    }}>
                        {props.value}
                    </div>
                </>
            );
        }
        return (
            <>
                <div style={{}}>
                    <img alt="" src={"http://localhost:8080/download/uid/" + props.id} style={{ height: "45px", width: "45px" }} />
                    <div style={{
                        display: "inline-block",
                        paddingLeft: "10px",
                        verticalAlign: "top",
                        marginTop: "10px"
                    }}>
                        {props.value}
                        <span style={{
                            display: "block",
                            fontSize: "12px",
                            color: "#808080",
                        }}>{"Last Updated: " + props.lastUpdated}</span>
                    </div>
                </div>
            </>
        );
    }

    const displayRow = (props) => {
        if (props.colId === "name")
            return (conditionRow(props.id, props.value, props.lastUpdated));
        else if (props.colId === "details")
            return (<div style={{ maxWidth: 230 }}>{props.value}</div>)
        else if (props.colId === "date")
            return (
                <>
                    {props.value}
                    <div style={{ color: "#808080" }}>{props.hours}</div>
                </>
            );
        else
            return (props.value);
    }

    return (
        <>
            {rows
                .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                .map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {props.columns.map((column) => {
                                let value = row[column.id];
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={styles.cell}
                                        value={value}
                                        onClick={() => handleCellClick(column.id, row.id)}
                                    >
                                        {
                                            column.id === 'id' ?
                                                <div style={styles.inputStyling} >
                                                    {value}
                                                </div>
                                                :
                                                <div style=
                                                    {
                                                        editingCell &&
                                                            editingCell.colId === column.id &&
                                                            editingCell.rowId === row.id ?
                                                            styles.divInput : null
                                                    }
                                                >
                                                    <input style={styles.inputStyling}
                                                        value={value}
                                                        onChange={(event) => handleInputChange(column.id, row.id, event)}
                                                        onBlur={handleInputBlur}
                                                        autoFocus
                                                    />
                                                </div>
                                        }

                                    </TableCell>
                                );
                            })}
                        </TableRow >
                    );
                })}
        </>
    );
}

const styles = {
    cell: {
        fontFamily: "Mulish",
        fontWeight: "bold",
        height: "35px",
    },
    inputStyling: {
        fontFamily: "Mulish-Regular",
        fontWeight: "bold",
        fontSize: "15px",
        background: "transparent",
        outline: "none",
        border: 'none',
    },
    divInput: {
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "transparent",
        outline: "none",
        padding: "5px",
        marginLeft: "-8px"
    }
}

export default RecordsRow;