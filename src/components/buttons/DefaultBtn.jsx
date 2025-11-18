import React from 'react';
import {Button} from "antd";

import "./default_btn.scss"

const DefaultBtn = ({btnName, onClick, icon, loading, style, title, danger}) => {

    return (
        <Button
            onClick={onClick}
            icon={icon ? icon : null}
            loading={loading}
            danger={danger}
            className="custom-default-btn"
            style={{...style}}
        >
            {btnName} {title ? <span className="btn-title">{title}</span> : null}
        </Button>
    );
};

export default DefaultBtn;