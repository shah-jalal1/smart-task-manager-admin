import React from 'react';
import {Button} from "antd";

import "./custom_drop_down_btn.scss";

const CustomDropDownBtn = (icon) => {
    return (
        <Button
            className="custom-drop-down-btn"
            icon={icon}
        />
    );
};

export default CustomDropDownBtn;