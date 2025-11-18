import React, {createContext, useState} from 'react';

export const GlobalContext = createContext("GlobalContext");

const GlobalContextProvider = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <GlobalContext.Provider
            value={{
                collapsed,
                setCollapsed,
                toggleCollapsed,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContextProvider;
