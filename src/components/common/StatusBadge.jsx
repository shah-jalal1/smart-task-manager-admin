import React from 'react';
import {addressChangeStatus} from "../../constant/ConstantVariables.js";

const StatusBadge = ({status, color}) => {
    if (!status) {
        return null;
    }


    const statusKey = status.replace(' ', '_').toUpperCase();
    const statusConfig = addressChangeStatus[statusKey];


    return (
        <span
            style={{
                color: color || statusConfig.color || 'white',
                fontWeight: "500",
                fontSize: "14px"
            }}
        >
            {statusConfig.name}
        </span>
    );
};

export default StatusBadge;