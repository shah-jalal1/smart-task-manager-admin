import React, {useContext} from 'react';
import {Col, Form, Input, Row} from "antd";
import CustomTitle from "../../components/common/CustomTitle.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {LOGIN_PATH, ROOT_PATH} from "../../routes/Slug.js";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import LoginFormLayoutOne from "../../components/form-layout/LoginFormLayoutOne.jsx";

import "./login_form.scss";

const SignUp = () => {

    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const [form] = Form.useForm();


    const onFinish = async values => {
        const res = await authContext.signUp(values);
        
        if (res) {
            navigate(ROOT_PATH);
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
                    title="Create Account"
                    style={{fontSize: "34px", marginBottom: "16px"}}
                />

                <CustomTitle
                    title="Sign Up"
                    style={{fontSize: "24px"}}
                />

                <p className="login-form-subtitle">
                    Enter your details to create your account!
                </p>

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {required: true, message: "Name is required"},
                        {min: 2, message: "Name must be at least 2 characters"},
                    ]}
                >
                    <Input placeholder="Enter your name"/>
                </Form.Item>

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
                        loading={authContext.loading}
                        btnName="Sign Up"
                    />
                </Form.Item>

                <div style={{textAlign: "center", marginTop: "16px"}}>
                    <span>Already have an account? </span>
                    <Link to={LOGIN_PATH}>
                        <span className="text-primary-gradient-color">Sign In</span>
                    </Link>
                </div>

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

export default SignUp;
