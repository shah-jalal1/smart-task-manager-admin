/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 21 Apr 2025
 * Time: 2:28 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

import React, {lazy, Suspense, useContext, useEffect} from 'react';
import {Layout} from 'antd';
import {Navigate, Route, Routes} from "react-router-dom";
import PageRoutes from "../../routes/PageRoutes";
import LoadingSuspense from "../common/LoadingSuspense.jsx";
import Page404 from "../../pages/error-pages/Page404.jsx";
import {DASHBOARD_VIEW_PATH, ROOT_PATH} from "../../routes/Slug.js";
import {GlobalContext} from "../../context/GlobalContextProvider.jsx";
import {AuthContext} from "../../context/AuthContextProvider.jsx";

import "./default_layout.scss";

const AsideLeft = lazy(() => import('./AsideLeft.jsx'));

const {Sider, Content} = Layout;

const DefaultLayout = () => {

    const {collapsed} = useContext(GlobalContext);
    const {
        isLogin,
        getProfile,
        profile
    } = useContext(AuthContext);

    useEffect(() => {
        if (isLogin && getProfile) {
            getProfile();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={260}
                collapsedWidth={0}
                theme="light"
                className="my-sider"
            >
                <Suspense fallback={<LoadingSuspense height="100dvh"/>}>
                    <AsideLeft profile={profile}/>
                </Suspense>
            </Sider>

            <Layout>
                <Content className="app-page">
                    {
                        <Suspense fallback={<LoadingSuspense/>}>
                            <Routes>
                                {
                                    PageRoutes.map(route => {

                                        // if (!hasPermission(loggedUserPermissions, route.permissions)) {
                                        //     return null;
                                        // }

                                        return <Route
                                            key={route.path}
                                            path={route.path}
                                            element={<route.component/>}
                                        />
                                    })
                                }
                                <Route
                                    path={ROOT_PATH}
                                    element={<Navigate to={DASHBOARD_VIEW_PATH}/>}
                                />
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        </Suspense>
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
