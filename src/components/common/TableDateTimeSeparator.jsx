import React from 'react';
import {longToDateFormaterTwo, longToTimeFormatter} from "../../utils/DateFormaterUtils.js";

const TableDateTimeSeparator = ({date}) => {
    return (
        <div>
            <p style={{margin: "2px 0"}}>
                {longToTimeFormatter(date)}
            </p>
            <p style={{margin: "2px 0"}}>
                {longToDateFormaterTwo(date)}
            </p>
        </div>
    );
};

export default TableDateTimeSeparator;