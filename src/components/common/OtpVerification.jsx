import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Flex, Form, Row, Space, Statistic} from "antd";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import useNeedHelpLogin from "../../hooks/need-help-login/useNeedHelpLogin.js";
import useLogin from "../../hooks/login/useLogin.js";
import {INPUT_BGC} from "../../constant/ColorConstant.js";
import CustomTitle from "./CustomTitle.jsx";
import OTPInput from "react-otp-input";
import PrimaryBtn from "../buttons/PrimaryBtn.jsx";
import LoginCoverTwo from "../admin-login/LoginCoverTwo.jsx";
import LoginFormLayoutTwo from "../form-layout/LoginFormLayoutTwo.jsx";

import "./otp_verication.scss";
import {TEMP_USER} from "../../constant/ConstantVariables.js";
import GoBackBtn from "../buttons/GoBackBtn.jsx";
import {useNavigate} from "react-router-dom";

const {Countdown} = Statistic;

const OtpVerification = ({submitOtp, title, resendOtp, changeEmail}) => {

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    let _tempUser = localStorage.getItem(TEMP_USER);
    _tempUser = _tempUser ? JSON.parse(_tempUser) : null;

    const {createUserHelpRequest, loading} = useNeedHelpLogin();
    const {isActivate, getActiveUserChange} = useLogin();

    const otpDuration = 3 * 60; // 3 minutes

    const [form] = Form.useForm();

    const [otp, setOTP] = useState("");

    const [countdownFinished, setCountdownFinished] = useState(true);

    useEffect(() => {
        authContext.getTempUser();
    }, [_tempUser]);


    useEffect(() => {
        if (new Date(_tempUser?.otpValidTime + otpDuration * 1000) > new Date()) {
            setCountdownFinished(false);
        } else {
            setCountdownFinished(true);
        }
    }, [_tempUser]);

    const onFinish = async values => {

        values.code = otp;

        const _data = {
            ...authContext.tempUser,
            code: values.code,
        };

        submitOtp(_data);
    }

    const inputStyle = {
        width: "16%",
        height: 64,
        fontSize: 18,
        fontWeight: 600,
        border: "none",
        borderRadius: "4px",
        backgroundColor: INPUT_BGC
    }

    const handleCountdownFinished = () => {
        setOTP("");
        setCountdownFinished(true);
    };

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
                className="login-verfication"
            >

                <div style={{
                    marginBottom: "36px"
                }}>
                    <GoBackBtn
                        onClick={() => navigate(-1)}
                    />
                </div>

                <CustomTitle
                    title="Otp Verifcation"
                    style={{fontSize: "24px"}}
                />

                <p className="login-form-subtitle">
                    Enter the OTP code that has been sent to your email ({authContext?.tempUser?.email ?? ""}) to
                    complete verification
                </p>

                <Flex justify="space-between" align="center" className="otp-footer">
                    <div className="remaining-time">
                        <Space size="regular16 text-[#354764]">
                            Remaining:{" "}
                            <Countdown
                                value={authContext?.tempUser?.otpValidTime + otpDuration * 1000}
                                onFinish={handleCountdownFinished}
                                format="m:ss"
                                valueStyle={{
                                    color: "#354764",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    paddingBottom: "2px"
                                }}
                            />
                        </Space>
                    </div>
                    {
                        countdownFinished ?
                            <Button
                                type="text"
                                loading={authContext.loading}
                                className="resend-code-button"
                                onClick={resendOtp}
                            >
                        <span
                            className=" medium14"
                        >Resend Code</span>
                            </Button> : null
                    }
                </Flex>

                <Form.Item
                >
                    <div className="otp-wrapper">
                        <OTPInput
                            inputType="tel"
                            value={otp}
                            onChange={setOTP}
                            numInputs={6}
                            renderInput={(props) => <input {...props} />}
                            containerStyle={{gap: 16}}
                            inputStyle={inputStyle}
                            focusStyle={{
                                border: "1px solid #DA1E28", // red border if needed
                                outline: "none",
                            }}
                        />
                    </div>
                </Form.Item>

            </Form>
        )
    }

    const childrenTwo = () => {
        return (
            <PrimaryBtn
                onClick={() => form.submit()}
                style={{width: "100%", marginTop: "16px"}}
                disabled={otp.length !== 6 || countdownFinished}
                loading={authContext.otpLoading}
                btnName={"Verify Code"}
            />
        )
    }

    return (
        <div className="need-help-login-form">
            <Row style={{height: "100%"}}>
                <Col md={12}>
                    <LoginCoverTwo
                        heroImg="/assets/images/enter_otp.svg "
                        coverWidth="500px"
                        coverHeight="380px"
                    />
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


export default OtpVerification;