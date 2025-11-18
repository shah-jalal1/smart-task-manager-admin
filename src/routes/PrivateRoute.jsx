import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {LOGIN_PATH} from "./Slug.js";

const PrivateRoute = ({isLogin}) => {
    return (isLogin ? <Outlet/> : <Navigate to={LOGIN_PATH}/>);
}

export default PrivateRoute;
