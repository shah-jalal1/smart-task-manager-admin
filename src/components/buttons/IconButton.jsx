import React from 'react';
import {Button} from "antd";

const IconButton = ({icon, onClick, loading, danger, type = "text", title}) => {
    return (
        <Button
            type={type}
            icon={icon}
            onClick={onClick}
            loading={loading}
            danger={danger}
            title={title}
            style={{border: 'none', padding: '4px 8px'}}
        />
    );
};

export default IconButton;
