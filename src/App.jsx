import {lazy, Suspense, useContext} from "react";
import {lightComponentsToken, lightToken} from "./theme/light.js";
import LoadingSuspense from "./components/common/LoadingSuspense.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ConfigProvider} from "antd";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import {
    LOGIN_PATH,
    REGISTER_PATH,
    PAGE_403_PATH,
    PAGE_404_PATH,
    PAGE_500_PATH
} from "./routes/Slug.js";
import DefaultLayout from "./components/layout/DefaultLayout.jsx";
import Interceptors from "./rest-handlers/Interceptors.jsx";
import {AuthContext} from "./context/AuthContextProvider.jsx";

const Page403 = lazy(() => import("./pages/error-pages/Page403.jsx"));
const Page404 = lazy(() => import("./pages/error-pages/Page404.jsx"));
const Page500 = lazy(() => import("./pages/error-pages/Page500.jsx"));

const Login = lazy(() => import("./pages/auth/Login.jsx"));
const Register = lazy(() => import("./pages/auth/Register.jsx"));


const App = () => {

    const {isLogin} = useContext(AuthContext)

    return (
        <ConfigProvider
            theme={{
                token: {...lightToken},
                components: lightComponentsToken
            }}
        >
            <div className="app-wrapper">
                <Suspense fallback={<LoadingSuspense/>}>
                    <BrowserRouter>
                        <Routes>
                            <Route path={LOGIN_PATH} element={<Login/>}/>
                            <Route path={REGISTER_PATH} element={<Register/>}/>
                            <Route element={<PrivateRoute isLogin={isLogin}/>}>
                                <Route path={PAGE_404_PATH} element={<Page404/>}/>
                                <Route path={PAGE_403_PATH} element={<Page403/>}/>
                                <Route path={PAGE_500_PATH} element={<Page500/>}/>
                                <Route path="*" element={<DefaultLayout/>}/>
                            </Route>
                        </Routes>
                        <Interceptors/>
                    </BrowserRouter>
                </Suspense>
            </div>
        </ConfigProvider>
    )
}

export default App
