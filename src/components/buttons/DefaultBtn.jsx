import React from 'react';
import {Button} from "antd";

import "./default_btn.scss"

const DefaultBtn = ({btnName, onClick, icon, loading, style, title}) => {

    return (
        <Button
            onClick={() => onClick ? onClick() : null}
            icon={icon ? icon : null}
            loading={loading}
            className="custom-default-btn"
            style={{...style}}
        >
            {btnName} {title ? <span className="btn-title">{title}</span> : null}
        </Button>
    );
};

export default DefaultBtn;