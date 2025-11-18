import React from 'react';
import {Col, Form, Input, Row} from "antd";
import LoginCoverTwo from "../../components/admin-login/LoginCoverTwo.jsx";
import LoginFormLayoutTwo from "../../components/form-layout/LoginFormLayoutTwo.jsx";
import {useNavigate} from "react-router-dom";
import CustomTitle from "../../components/common/CustomTitle.jsx";
import useAdminFinalizeLogin from "../../hooks/admin-login/useAdminFinalizeLogin.js";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import GoBackBtn from "../../components/buttons/GoBackBtn.jsx";
import withActiveAdmin from "../../hoc/withActiveAdmin.jsx";

const AdminLoginFinalize = () => {

    const {profile, handleFinalizeUsername} = useAdminFinalizeLogin();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const handleFormSubmit = () => {
        form.submit();
    }

    const onFinish = values => {
        handleFinalizeUsername(values);
    }

    const childrenOne = () => {
        return (
            <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                initialValues={
                    profile ? {
                        username: profile?.username
                    } : {}
                }
            >
                <div>
                    <GoBackBtn
                        onClick={() => navigate(-1)}
                    />

                    <CustomTitle
                        title="Hello! You're almost there."
                        style={{fontSize: "24px", marginTop: "16px"}}
                    />

                    <p>
                        To complete your activation, please finalize your username below.
                        This will be your identity for future logins.
                    </p>

                    <Form.Item
                        label="Choose your Final Username"
                        name="username"
                        rules={[
                            {required: true, message: "Username is required"}
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                </div>

            </Form>
        )
    }

    const childrenTwo = () => {
        return (
            <PrimaryBtn
                style={{width: "100%"}}
                onClick={handleFormSubmit}
                btnName="Finalize Username"
            />
        )
    }

    return (
        <div className="login-help">
            <Row style={{height: '100%'}}>
                <Col md={12}>
                    <LoginCoverTwo/>
                </Col>

                <Col md={12}>
                    <LoginFormLayoutTwo
                        childrenOne={childrenOne()}
                        childrenTwo={childrenTwo()}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default withActiveAdmin(AdminLoginFinalize);