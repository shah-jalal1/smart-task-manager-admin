/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 28 Apr 2025
 * Time: 10:22 AM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';

import "./page_content_card.scss";
import {Spin} from "antd";

const PageContentCard = ({icon, title, amount, iconBg, titleColor, loading = false}) => {
    return (
        <div className="page-content-card">

            <div
                className="icon-wrapper"
                style={{background: iconBg}}
            >
                {icon}
            </div>

            <div className="title-wrapper">
                <p className="title">
                    {title}
                </p>
                <div
                    className="amount"
                    style={{color: titleColor}}
                >
                    {loading ? <Spin size="small"/> : amount}
                </div>
            </div>

        </div>
    );
};

export default PageContentCard;