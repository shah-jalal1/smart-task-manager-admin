/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 30 Apr 2025
 * Time: 10:47 AM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';
import {Col, Form, Input, Row} from "antd";
import LoginCoverOne from "../../components/admin-login/LoginCoverOne.jsx";
import LoginFormLayoutOne from "../../components/form-layout/LoginFormLayoutOne.jsx";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import CustomTitle from "../../components/common/CustomTitle.jsx";
import useAdminLogin from "../../hooks/admin-login/useAdminLogin.js";
import withActiveAdmin from "../../hoc/withActiveAdmin.jsx";

const AdminLogin = () => {

    const {loginLoading, adminLogin} = useAdminLogin();

    const [form] = Form.useForm();

    const onFinish = values => {
        adminLogin(values);
    }

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
            >
                <CustomTitle
                    title="Welcome to the Admin Activation Portal!"
                    style={{fontSize: "24px"}}
                />
                <p>
                    Please enter your credentials to get started.
                </p>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {required: true, message: "Username is required"}
                    ]}
                >
                    <Input
                        placeholder="admin"
                    />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {required: true, message: "Password is required"}
                    ]}
                >
                    <Input
                        placeholder="admin"
                    />
                </Form.Item>

                <PrimaryBtn
                    style={{width: "100%", marginTop: "16px"}}
                    loading={loginLoading}
                    btnName="Sign In"
                    onClick={() => form.submit()}
                />

            </Form>
        )
    }


    return (
        <div className="admin-activation-login">
            <Row style={{height: '100%'}}>
                <Col md={12}>
                    <LoginCoverOne/>
                </Col>

                <Col md={12}>
                    <LoginFormLayoutOne
                        childrenOne={childrenOne()}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default withActiveAdmin(AdminLogin);