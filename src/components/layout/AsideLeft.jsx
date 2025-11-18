import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Menu} from "antd";
import Brand from "./brand/Brand.jsx";
import Navs from "../../routes/Navs.js";
import {getIcon} from "../Icons.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";
import {getSelectedMenu} from "../../utils/GenericUtils.js";

import "./aside_left.scss";

const AsideLeft = () => {

    const {logout, profile} = useContext(AuthContext);

    const [requestCount, setRequestCount] = useState(null);
    const location = useLocation();

    const [selectedKeys, setSelectedKeys] = useState(getSelectedMenu(location))

    useEffect(() => {
        setSelectedKeys(getSelectedMenu(location));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    /* Menu Binding Start */
    const bindSingleMenuItem = (item) => {
        return (
            {
                key: item.key,
                label: <>
                    {item.title}
                    {item.path && <Link to={item.path}/>}
                </>,
                icon: item.icon,
                extra: item.notification ? requestCount && requestCount[item?.key] : null
            }
        )
    }

    const bindSubMenuItem = item => {
        return (
            {
                key: item.key,
                label: <div style={{fontSize: "14px"}}>{item.title}</div>,
                icon: item.icon,
                children: item.subMenu.map(childItem => getMenuItems(childItem))
            }
        )
    }

    const getMenuItems = (item) => {

        // if (!hasPermission(loggedUserRoles, item.roles)) {
        //     return null;
        // }

        return item.subMenu ? bindSubMenuItem(item) : bindSingleMenuItem(item);
    }

    /* Menu Binding End */
    const bottomMenuItems = [
        {
            key: "user",
            label: `${profile?.firstName} ${profile?.lastName}`,
            icon: getIcon("user_circle"),
        },
        // {
        //     key: "user",
        //     label: <span>
        //         Settings
        //     </span>,
        //     icon: <span>
        //         {getIcon("settings")}
        //     </span>,
        // },
        {
            key: "logout",
            label: "Logout",
            icon: getIcon("logout"),
            onClick: () => logout()
        },
    ]


    return (
        <div className="aside-left">

            <Brand/>

            {

                <div className="menu-wrapper">

                    <Menu
                        theme="light"
                        mode="inline"
                        onClick={item => setSelectedKeys(item.key)}
                        items={Navs.map(item => getMenuItems(item))}
                        selectedKeys={[selectedKeys]}
                        className="aside-left-content-top"
                    />

                    <Menu
                        theme="light"
                        mode="inline"
                        items={bottomMenuItems}
                        className="aside-left-content-bottom"
                    />

                </div>

            }

        </div>
    );
}

export default AsideLeft;
