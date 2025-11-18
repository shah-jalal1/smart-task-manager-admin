import React, {createContext} from 'react';
import {notification} from "antd";
import {setToastApi} from "../components/common/Toast.jsx";

export const ToastContext = createContext(null);

const ToastContextProvider = ({children}) => {

    const [api, contextHolder] = notification.useNotification({
        stack: {
            threshold: 1,
        },
    });

    setToastApi(api);

    return (
        <ToastContext.Provider value={api}>
            {contextHolder}
            {children}
        </ToastContext.Provider>
    );

};

export default ToastContextProvider;
