/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 22 Apr 2025
 * Time: 4:44 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';

import "./text_btn.scss";

const TextBtn = ({btnName, style, onClick = null}) => {
    return (
        <div
            className="text-btn"
            style={style}
            onClick={onClick}
        >
            {btnName}
        </div>
    );
};

export default TextBtn;