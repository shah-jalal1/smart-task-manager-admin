import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import {providers} from "./ProviderInjection.js";
import '@ant-design/v5-patch-for-react-19';

import "./assets/scss/root_style.scss";

const getAppWithContextProviders = () => {

    let result = <App/>
    providers.forEach(Provider => result = <Provider>{result}</Provider>);

    return result;
}

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    getAppWithContextProviders()
    // </StrictMode>,
)
