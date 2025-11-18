import React from 'react';
import { Button } from "antd";

import "./tertiary_btn.scss"

const TertiaryBtn = ({ btnName, onClick, icon, loading, style, ...rest }) => {

    return (
        <Button
            onClick={() => onClick ? onClick() : null}
            icon={icon ? icon : null}
            loading={loading}
            className="tertiary-btn"
            style={{ ...style }}
            {...rest}
        >
            {btnName}
        </Button>
    );
};

export default TertiaryBtn;