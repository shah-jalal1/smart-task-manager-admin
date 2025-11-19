import React from 'react';
import {Button} from "antd";

import "./delete_btn.scss";

const DeleteBtn = ({btnName, onClick, icon, loading, disabled = false, style, ...rest}) => {

    return (
        <Button
            onClick={onClick}
            icon={icon ? icon : null}
            loading={loading}
            disabled={disabled}
            className="delete-btn"
            style={{...style}}
            {...rest}
        >
            {btnName}
        </Button>
    );
};

export default DeleteBtn;