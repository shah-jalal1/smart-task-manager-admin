import React from 'react';
import { Button } from "antd";

import "./delete_secondary_btn.scss"

const DeleteSecondaryBtn = ({ btnName, onClick, icon, loading, style, ...rest }) => {

    return (
        <Button
            onClick={onClick}
            icon={icon ? icon : null}
            loading={loading}
            className="delete-secondary-btn"
            style={{ ...style }}
            {...rest}
        >
            {btnName}
        </Button>
    );
};

export default DeleteSecondaryBtn;