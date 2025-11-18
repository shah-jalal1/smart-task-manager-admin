import {Form} from "antd";
import {useNavigate} from "react-router-dom";
import LoadingSuspense from "../common/LoadingSuspense.jsx";
import PrimaryBtn from "../buttons/PrimaryBtn.jsx";
import DefaultBtn from "../buttons/DefaultBtn.jsx";
import ImageView from "../viewer/ImageView.jsx";
import useAdminLoginQRCode from "../../hooks/admin-login/useAdminLoginQRCode.js";
import GoBackBtn from "../buttons/GoBackBtn.jsx";

import "./admin_login_qr_code_form.scss";

const AdminLoginQRCodeForm = () => {

    const {
        qrCodeLoading,
        qrCode,
        qrCodeDownloadLoading,
        downloadQRCode,
        activeAdmin,
        activeAdminLoading,
        profile,
    } = useAdminLoginQRCode();

    const navigate = useNavigate();

    const [form] = Form.useForm();

    const onFinish = () => {
        activeAdmin();
    }

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            className="admin-login-qr-code-form"
        >
            <div>
                <GoBackBtn
                    onClick={() => navigate(-1)}
                />

                <p className="login-qr-code-title">
                    QR Code Generation
                </p>

                <p>
                    Download your QR code to set up your authenticator app. This code will
                    allow you to generate a secure login code for future access.
                </p>

                <div className="admin-login-qr-code-content">
                    <p className="admin-login-qr-code-generated-txt">
                        QR Code Generated For <span>"{profile?.username}"</span>
                    </p>

                    {
                        qrCodeLoading ? <LoadingSuspense/> :
                            qrCode ? <div className="qr-code">
                                <ImageView
                                    url={qrCode}
                                />
                            </div> : <p className="qr-code">
                                UNAVAILABLE QR CODE
                            </p>
                    }

                    <div className="admin-login-qr-code-btn-wrapper">
                        <DefaultBtn
                            style={{width: "100%"}}
                            btnName="Share QR Code"
                        />
                    </div>

                </div>

            </div>

            <div>
                <PrimaryBtn
                    btnName="Continue"
                    onClick={() => form.submit()}
                    loading={activeAdminLoading}
                    style={{width: "100%"}}
                />
            </div>

        </Form>
    );
};

export default AdminLoginQRCodeForm;