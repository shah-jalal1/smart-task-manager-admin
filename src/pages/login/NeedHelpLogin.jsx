import {Col, Flex, Form, Input, Radio, Row} from "antd";
import {useNavigate} from "react-router-dom";
import CustomTitle from "../../components/common/CustomTitle.jsx";
import {FORGOT_USERNAME, LOST_DEVICE} from "../../constant/ConstantVariables.js";
import useNeedHelpLogin from "../../hooks/need-help-login/useNeedHelpLogin.js";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import GoBackBtn from "../../components/buttons/GoBackBtn.jsx";
import {INPUT_BGC} from "../../constant/ColorConstant.js";
import {getIcon} from "../../components/Icons.jsx";
import LoginCoverTwo from "../../components/admin-login/LoginCoverTwo.jsx";
import LoginFormLayoutTwo from "../../components/form-layout/LoginFormLayoutTwo.jsx";

const NeedHelpLogin = () => {

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const {
        loading,
        createUserHelpRequest,
        handleUserHelpType,
        helpType,
    } = useNeedHelpLogin();

    const handleFormSubmit = () => {
        form.submit();
    }

    const onFinish = values => {

        values.type = helpType;

        createUserHelpRequest(values);

    }

    const childrenOne = () => {
        return (
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
            >

                <GoBackBtn
                    onClick={() => navigate(-1)}
                />
                <CustomTitle
                    title="Need help to sign in ?"
                    style={{fontSize: "24px", margin: "16px 0"}}
                />

                <Form.Item
                    label="Please choose where you are facing issues"
                    style={{
                        backgroundColor: INPUT_BGC,
                        padding: "16px",
                        borderRadius: "2px"
                    }}
                >
                    <Radio.Group
                        onChange={handleUserHelpType}
                        value={helpType}
                        style={{width: "100%"}}
                    >
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}>
                            <Flex justify="space-between" align="center">
                                <div>
                                    <Radio value={LOST_DEVICE}>
                                        Lost My Device
                                    </Radio>
                                </div>
                                {
                                    helpType === LOST_DEVICE ? getIcon("check_circle_filled") : null
                                }
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <div>
                                    <Radio value={FORGOT_USERNAME}>Forgot Username</Radio>
                                </div>
                                {
                                    helpType === FORGOT_USERNAME ? getIcon("check_circle_filled") : null
                                }
                            </Flex>
                        </div>
                    </Radio.Group>
                </Form.Item>

                {
                    helpType === LOST_DEVICE ? <>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[
                                {required: true, message: "Username is required"}
                            ]}
                        >
                            <Input
                                placeholder="Enter your username here"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Registered Email Address (Optional)"
                            name="email"
                            rules={[
                                {type: "email", message: "Email address is required"},
                            ]}
                        >
                            <Input
                                placeholder="Enter the email linked with your account here"
                            />
                        </Form.Item>
                    </> : null
                }

                {
                    helpType === FORGOT_USERNAME ? <>
                        <Form.Item
                            label="Registered Email Address"
                            name="email"
                            rules={[
                                {required: true, message: "Registered email address is required"},
                                {type: "email", message: "Invalid email address"}
                            ]}
                        >
                            <Input
                                placeholder="Enter the email linked with your account here"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Message to Admin (Optional)"
                            name="message"
                        >
                            <Input.TextArea
                                placeholder="Enter your message here "
                            />
                        </Form.Item>
                    </> : null
                }

            </Form>
        )
    }

    const childrenTwo = () => {
        return (
            <PrimaryBtn
                style={{width: "100%"}}
                onClick={handleFormSubmit}
                loading={loading}
                btnName="Send Request"
            />
        )
    }

    return (
        <div className="need-help-login-form">
            <Row style={{height: "100%"}}>
                <Col md={12}>
                    <LoginCoverTwo
                        heroImg="/assets/images/help_signin_cover.png"
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

export default NeedHelpLogin;