/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 30 Apr 2025
 * Time: 10:49 AM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';

import "./login_form_layout_two.scss";

const LoginFormLayoutTwo = ({childrenOne, childrenTwo}) => {
    return (
        <div className="login-form-layout-two">
            <div className="login-form-layout-two-children-one">
                {childrenOne}
            </div>
            <div className="login-form-layout-two-children-two">
                {childrenTwo}
            </div>
        </div>
    );
};

export default LoginFormLayoutTwo;