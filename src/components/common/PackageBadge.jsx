import React from 'react';
import {Tag} from "antd";
import {packageTypeStyle} from "../../constant/ConstantVariables.js";

const PackageBadge = ({status, color}) => {
    if (!status) {
        return null;
    }

    const statusKey = status.replace(' ', '_').toUpperCase();
    const packageStyle = packageTypeStyle[statusKey];

    return (
        <Tag
            color={packageStyle?.bgColor || ""}
            style={{
                color: color || packageStyle?.color || 'white',
                // padding: '6px 12px',
                // borderRadius: '9999px',
            }}
        >
            {packageStyle?.name}
        </Tag>
    );
};


export default PackageBadge;