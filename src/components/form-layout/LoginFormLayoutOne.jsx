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