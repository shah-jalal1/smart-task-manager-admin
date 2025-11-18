import {useMemo, useState} from 'react';
import debounce from "debounce";
import AuthService from "../../services/AuthService.js";
import {getErrorMessage} from "../../utils/GenericUtils.js";

const useLogin = () => {

    const [isActivate, setIsActivate] = useState(true);

    const getActiveUserChange = useMemo(() => {

        return debounce((username) => {

            if (username?.length === 0) {
                setIsActivate(true);
            }

            if (username) {
                getActiveAdmin(username);
            }
        }, 400);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getActiveAdmin = async username => {
        try {

            const res = await AuthService.getActiveUser(username);
            setIsActivate(res.data);

        } catch (error) {

            const message = getErrorMessage(error);
            console.log(message)

        }
    }

    return {isActivate, getActiveUserChange}

};

export default useLogin;