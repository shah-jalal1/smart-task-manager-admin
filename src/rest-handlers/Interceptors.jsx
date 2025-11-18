import {useContext} from "react";
import privateAPI from "./privateAPI";
import {authorizationHeader} from "../utils/GenericUtils.js";
import {AuthContext} from "../context/AuthContextProvider.jsx";

const Interceptors = () => {

    const authContext = useContext(AuthContext);

    privateAPI.interceptors.request.use(
        (config) => {

            if (!config.headers.Authorization) {
                config.headers = {...config.headers, ...authorizationHeader()};
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    privateAPI.interceptors.response.use(
        (res) => {
            return res;
        }, // If valid response
        async (err) => {

            const originalConfig = err.config;

            if (err.response) {

                // Do something with response error
                /*
                * ToDo: originalConfig._retry issue need to be fixed
                * */
                if (err.response.status === 401) {
                // if (err.response.status === 401 && originalConfig._retry) {
                    authContext.logout();
                }

            }

            return Promise.reject(err);
        }
    );

    return (<></>);
}

export default Interceptors;
