import React, {useContext} from 'react';
import {Col, Form, Input, Row} from "antd";
import CustomTitle from "../../components/common/CustomTitle.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {ROOT_PATH, SIGN_UP_PATH} from "../../routes/Slug.js";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import useNeedHelpLogin from "../../hooks/need-help-login/useNeedHelpLogin.js";
import useLogin from "../../hooks/login/useLogin.js";
import LoginCoverOne from "../../components/admin-login/LoginCoverOne.jsx";
import LoginFormLayoutOne from "../../components/form-layout/LoginFormLayoutOne.jsx";

import "./login_form.scss";

const Login = () => {

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const {createUserHelpRequest, loading} = useNeedHelpLogin();
    const {isActivate, getActiveUserChange} = useLogin();

    const [form] = Form.useForm();


    const onFinish = async values => {
        const res = await authContext.login(values);

        if (res) {
            window.location.reload();
        }

    }

    if (authContext.isLogin) return <Navigate to={ROOT_PATH}/>

    const childrenOne = () => {
        return (
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        form.submit();
                    }
                }}
                className="login-form"
            >
                <CustomTitle
                    title="Welcome Back!"
                    style={{fontSize: "34px", marginBottom: "16px"}}
                />

                <CustomTitle
                    title="Sign In"
                    style={{fontSize: "24px"}}
                />

                <p className="login-form-subtitle">
                    Enter your username and passkey to sign in!
                </p>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: "Email is required"},
                        {type: "email", message: "Enter a valid email"},
                    ]}
                >
                    <Input placeholder="Enter your email"/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Password is required"},
                        {min: 8, message: "Password must be at least 8 characters"},
                    ]}
                >
                    <Input.Password placeholder="Enter your password"/>
                </Form.Item>


                <Form.Item>
                    <PrimaryBtn
                        onClick={() => form.submit()}
                        style={{width: "100%", marginTop: "16px"}}
                        loading={loading || authContext.loginLoading}
                        btnName={!isActivate ? "Send request for activation" : "Sign In"}
                    />
                </Form.Item>

                <div style={{textAlign: "center", marginTop: "16px"}}>
                    <span>Don't have an account? </span>
                    <Link to={SIGN_UP_PATH}>
                        <span className="text-primary-gradient-color">Sign Up</span>
                    </Link>
                </div>


                {/*<Link to={LOGIN_NEED_HELP_PATH}>*/}
                {/*    <span className="need-help-login text-primary-gradient-color">*/}
                {/*        Need help to sign in ?*/}
                {/*    </span>*/}
                {/*</Link>*/}

            </Form>
        )
    }

    return (
        <div className="login">
                    <LoginFormLayoutOne
                        childrenOne={childrenOne()}
                    />
        </div>
    );
};

export default Login;