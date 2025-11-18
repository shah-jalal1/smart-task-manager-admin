import React from 'react';
import ImageView from "../viewer/ImageView.jsx";

import "./login_cover_two.scss";
import {ROOT_PATH} from "../../routes/Slug.js";
import {Link, useNavigate} from "react-router-dom";

const LoginCoverTwo = ({
                           heroImg = "/assets/images/username_change_cover.png",
                           coverWidth = "450px",
                           coverHeight = "450px"
                       }) => {


    const navigate = useNavigate();

    const handleClick = () => {
        navigate(ROOT_PATH);
        window.location.reload();
    }

    return (
        <div className="login-cover-two">
            {/*<Link to={ROOT_PATH}>*/}
            <div
                className="login-cover-two-brand-wrapper"
                onClick={handleClick}
            >
                <ImageView
                    url="/assets/brand_logo.svg"
                    style={{width: "210px"}}
                />
            </div>
            {/*</Link>*/}
            <div className="login-cover-hero-wrapper">
                <ImageView
                    url={heroImg}
                    style={{width: coverWidth, height: coverHeight}}
                />
            </div>
        </div>
    );
};

export default LoginCoverTwo;