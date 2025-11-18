import ImageView from "../viewer/ImageView.jsx";

import "./login_cover_one.scss";
import {Link, useNavigate} from "react-router-dom";
import {ROOT_PATH} from "../../routes/Slug.js";

const LoginCoverOne = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(ROOT_PATH);
        window.location.reload();
    }

    return (
        <div className="admin-activation-login-cover">
            {/*<Link to={ROOT_PATH}>*/}
            <div
                onClick={handleClick}
                className="admin-activation-login-cover-brand-wrapper">
                <ImageView
                    url="/assets/brand_logo.svg"
                    style={{width: "210px"}}
                />
            </div>
            {/*</Link>*/}
            <div className="admin-activation-login-cover-wrapper">
                <ImageView
                    url="/assets/images/signin_cover.png"
                    style={{width: "500px", height: "332px"}}
                />

                <p className="all-right">© 2025 All Rights Reserved. </p>
            </div>
        </div>
    );
};

export default LoginCoverOne;