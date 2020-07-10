import React from 'react';

// Handles all active row input data
export const RowInput = (props) => (
    <td align='center'>
        <input
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onClick={props.onClick}
            style={{ width: props.width }}
            disabled={props.disabled}
            checked={(props.value==="Yes")}
            height={'100px'}
        />
    </td>
);

export const RoleInput = (props) => (
    <td align='center'>
        <select value={props.value} onChange={props.onChange}>
            <option value="">--- select ---</option>
            <option value="Keeper">Keeper</option>
            <option value="Defender">Defender</option>
            <option value="Midfielder">Midfielder</option>
            <option value="Attacker">Attacker</option>
        </select>
    </td>
);

// Handles all frozen rows data
export const RowItem = (props) => (
    <td align='center'>
        <span> {props.value} </span>
    </td>
);

// Handles Table Header section in the web-page
export const TableHeader = (props) => (
    <thead style={{ backgroundColor: 'gainsboro', color: 'black', tableLayout: "auto", width: "180px", border: "auto", fontSize: "14px"}}>
        <tr>
            {
                props.values.map((value, idx) => (
                    <th key={idx} className="text-center" style={{paddingTop: "60px"}}>{value}</th>
                ))
            }
        </tr>
    </thead>
);

// Handles Response Header section in the web-page
export const ResponseMessage = (props) => (
    <p align='center'>
        {props.value}
    </p>
);

// Handles Document Header section in the web-page
export const DocumentHeader = (props) => (
    <div
    style={{ fontSize:"40px", justifyContent:'center', color: 'white', backgroundColor: "#3B3B38", width: "100%", position: "fixed", top: "0"}}
    align='center' >
        {props.value}
    </div>
);