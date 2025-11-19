import {useState} from 'react';

const useLogin = () => {
    const [isActivate, setIsActivate] = useState(true);

    const getActiveUserChange = (value) => {
        setIsActivate(value);
    };

    return {
        isActivate,
        getActiveUserChange
    };
};

export default useLogin;
