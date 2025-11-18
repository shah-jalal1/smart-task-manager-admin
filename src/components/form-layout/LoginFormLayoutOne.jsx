/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 30 Apr 2025
 * Time: 10:49 AM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';

import "./login_form_layout_one.scss";

const LoginFormLayoutOne = ({childrenOne, childrenTwo}) => {
    return (
        <div className="login-form-layout-one">
            <div className="login-form-layout-child-one">
                {childrenOne}
            </div>
            <div style={{padding: "0 80px"}}>
                {childrenTwo}
            </div>
        </div>
    );
};

export default LoginFormLayoutOne;