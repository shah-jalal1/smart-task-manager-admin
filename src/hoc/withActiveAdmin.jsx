import {Navigate} from "react-router-dom";
import {LOGIN_PATH} from "../routes/Slug.js";
import LoadingSuspense from "../components/common/LoadingSuspense.jsx";
import useActiveAdmin from "../hooks/admin-login/useActiveAdmin.js";

const withActiveAdmin = Component => {

    /*
    * If admin is not active then it will stay on the current page otherwise
    * it will navigate to the login page
    * */

    return (props) => {

        const {isActivate, activeLoading} = useActiveAdmin();

        if (activeLoading) {
            return <LoadingSuspense/>
        }

        if (isActivate) {
            return <Navigate to={LOGIN_PATH}/>;
        }
        return <Component {...props} />;
    };

};

export default withActiveAdmin;