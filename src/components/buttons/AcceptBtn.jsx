/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 22 Apr 2025
 * Time: 4:29 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';
import {Button} from "antd";

import "./accept_btn.scss"

const PrimaryBtn = ({btnName, onClick, icon, loading, disabled = false, style}) => {

    return (
        <Button
            onClick={() => onClick ? onClick() : null}
            icon={icon ? icon : null}
            loading={loading}
            disabled={disabled}
            className="accept-btn"
            style={{...style}}
        >
            {btnName}
        </Button>
    );
};

export default PrimaryBtn;