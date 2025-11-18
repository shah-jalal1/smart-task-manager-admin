import React, {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import ImageView from "../../viewer/ImageView.jsx";
import {getIcon} from "../../Icons.jsx";
import {GlobalContext} from "../../../context/GlobalContextProvider.jsx";

import "./brand.scss";
import {ROOT_PATH} from "../../../routes/Slug.js";

const Brand = () => {

    const navigate = useNavigate();

    const {collapsed, handleSidebarCollapse} = useContext(GlobalContext);

    return (
        <div
            className="brand"
            style={{
                justifyContent: collapsed ? "center" : "space-between"
            }}
        >
            {
                collapsed ? null :
                    <ImageView
                        url="/assets/brand_logo.svg"
                        style={{
                            width: "80%",
                        }}
                        onClick={() => navigate(ROOT_PATH)}
                        // onClick={() => navigate(authContext?.profile && navigateMap[getRole(authContext?.profile?.roles)])}
                    />
            }

            <div
                style={{cursor: "pointer"}}
                onClick={() => handleSidebarCollapse(!collapsed)}
                className="collapse-icon"
            >
                {getIcon("collapse_icon")}
            </div>

        </div>
    );
};


export default Brand;
