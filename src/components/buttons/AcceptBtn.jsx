import React from 'react';
import {Button} from "antd";

import "./accept_btn.scss"

const PrimaryBtn = ({btnName, onClick, icon, loading, disabled = false, style, ...rest}) => {

    return (
        <Button
            onClick={onClick}
            icon={icon ? icon : null}
            loading={loading}
            disabled={disabled}
            className="accept-btn"
            style={{...style}}
            {...rest}
        >
            {btnName}
        </Button>
    );
};

export default PrimaryBtn;