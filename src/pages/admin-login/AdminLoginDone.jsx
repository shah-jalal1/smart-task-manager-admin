import {Col, Row} from "antd";
import LoginCoverTwo from "../../components/admin-login/LoginCoverTwo.jsx";
import AdminLoginDoneContent from "../../components/admin-login/AdminLoginDoneContent.jsx";

import "./admin_login_done.scss";

const AdminLoginDone = () => {

    return (
        <div className="admin-login-done">
            <Row style={{height: "100%"}}>
                <Col md={12}>
                    <LoginCoverTwo
                        heroImg="assets/images/signin_done_cover.png"
                    />
                </Col>

                <Col md={12}>
                    <AdminLoginDoneContent/>
                </Col>
            </Row>
        </div>
    );
};

export default AdminLoginDone;