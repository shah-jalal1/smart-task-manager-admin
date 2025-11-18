import React from 'react';
import {Col, Row} from "antd";
import CustomTitle from "../../components/common/CustomTitle.jsx";
import {PRIMARY_COLOR} from "../../constant/ColorConstant.js";
import {LOGIN_PATH} from "../../routes/Slug.js";
import {useNavigate} from "react-router-dom";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import ImageView from "../../components/viewer/ImageView.jsx";
import LoginCoverTwo from "../../components/admin-login/LoginCoverTwo.jsx";
import LoginFormLayoutOne from "../../components/form-layout/LoginFormLayoutOne.jsx";

const LoginHelpRequestDone = () => {

    const navigate = useNavigate();

    const childrenOne = () => {
        return (
            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <ImageView
                    url="/assets/icons/check_circle.svg"
                    style={{width: "100px", height: "100px"}}
                />
                <CustomTitle
                    title="Request Sent Successfully"
                    style={{fontSize: "24px", color: PRIMARY_COLOR, margin: "34px 0"}}
                />
                <p>
                    Your request has been submitted to the admin. The admin will contact you
                    shortly. Thank you for being patient.
                </p>
            </div>
        )
    }

    const childrenTwo = () => {
        return (
            <PrimaryBtn
                onClick={() => navigate(LOGIN_PATH)}
                style={{width: "100%"}}
                btnName="Go back to Sign in"
            />
        )
    }

    return (
        <div className="login-help-done">
            <Row style={{height: "100%"}}>
                <Col md={12}>
                    <LoginCoverTwo
                        heroImg="/assets/images/signin_done_cover.png"
                    />
                </Col>

                <Col md={12}>
                    <LoginFormLayoutOne
                        childrenOne={childrenOne()}
                        childrenTwo={childrenTwo()}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default LoginHelpRequestDone;