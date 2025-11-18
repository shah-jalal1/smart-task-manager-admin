/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 21 Apr 2025
 * Time: 2:28 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React from 'react';
import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const ErrorLayout = ({status, title, subTitle, btnName, pathName}) => {
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={<Link to={pathName}><Button type="primary">{btnName}</Button></Link>}
        />
    );
};

export default ErrorLayout;