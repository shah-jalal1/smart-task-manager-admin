import React from 'react';
import {Button} from "antd";

import "./primary_btn.scss"

const PrimaryBtn = ({btnName, onClick, icon, loading, disabled = false, style, ...rest}) => {

    return (
        <Button
            onClick={onClick}
            icon={icon ? icon : null}
            loading={loading}
            disabled={disabled}
            className="primary-btn"
            style={{...style}}
            {...rest}
        >
            {btnName}
        </Button>
    );
};

export default PrimaryBtn;