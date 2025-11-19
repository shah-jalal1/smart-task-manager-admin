import React from 'react';
import {Button} from "antd";

import "./default_btn.scss"

const DefaultBtn = ({btnName, onClick, icon, loading, style, title, ...rest}) => {

    return (
        <Button
            onClick={onClick}
            icon={icon ? icon : null}
            loading={loading}
            className="custom-default-btn"
            style={{...style}}
            {...rest}
        >
            {btnName} {title ? <span className="btn-title">{title}</span> : null}
        </Button>
    );
};

export default DefaultBtn;