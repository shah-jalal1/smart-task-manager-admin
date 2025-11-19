import {ACCESS_TOKEN} from "../constant/ConstantVariables.js";

export const getErrorMessage = (error) => {
    if (error.response) {

        if (error.response.data) {
            return error.response.data.message || error.response.data.error;
        }

        return error.response.data;
    } else {
        return error.message;
    }
}

export const authorizationHeader = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return {"Authorization": `Bearer ${accessToken}`};
}

export const getSelectedMenu = (location) => {
    let path = location.pathname.split("/");
    return path[1] ?? "email-box";
}