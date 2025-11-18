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