import {Col, Row} from "antd";
import LoginCoverTwo from "../../components/admin-login/LoginCoverTwo.jsx";
import AdminLoginQRCodeForm from "../../components/admin-login/AdminLoginQRCodeForm.jsx";
import withActiveAdmin from "../../hoc/withActiveAdmin.jsx";

const AdminLoginQRCode = () => {

    return (
        <div className="login-qr-code">
            <Row style={{height: "100%"}}>
                <Col md={12}>
                    <LoginCoverTwo
                        heroImg="/assets/images/qr_code_cover.png"
                    />
                </Col>

                <Col md={12}>
                    <AdminLoginQRCodeForm/>
                </Col>
            </Row>
        </div>
    );
};

export default withActiveAdmin(AdminLoginQRCode);