import {useLocation} from "react-router-dom";
import {ACCESS_TOKEN, addressChangeStatus} from "../constant/ConstantVariables.js";
import dayjs from "dayjs";
import {Tag} from "antd";

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

export const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

export const bindUrlWithParams = (url, params) => {
    let result = url;

    Object.keys(params).forEach(key => {
        if (!params[key] || params[key].length < 1) {
            delete params[key];
        }
    });

    Object.keys(params).forEach((key, index) => {

        let param = params[key];

        if (Array.isArray(params[key])) {
            param = param.toString();
        }

        if (index === 0) {
            result += `?${key}=${param}`;
        } else {
            result += `&${key}=${param}`;
        }

    });

    return result;
}

export const getParams = (query, data) => {
    for (const key of Object.keys(data)) {

        let param = query.get(key);

        if (Array.isArray(data[key])) {

            if (param) {
                param = param.split(",");
            } else {
                param = [];
            }
        }

        data = {...data, [key]: param || ""}
    }
    return data;
}

export const enumToCapitalize = value => {
    if (!value) return "";
    const splitWord = value.split("_");
    return splitWord.map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(" ");
}

export const enumToLowercase = value => {
    if (!value) return "";
    const splitWord = value.split("_");
    return splitWord.map(word => word.toLowerCase()).join(" ");
}

export const authorizationHeader = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    return {"Authorization": `Bearer ${accessToken}`};
}

export const getNameFromFilePath = path => {
    if (path) {
        return path.split("/").pop().split("_").slice(1).join("_");
    }
}

export const fileDownloadDateFormat = date => {
    if (date) {
        return dayjs(date).format("YYYY-MM-DD_h:mm");
    } else {
        return "N/A"
    }
}

export const getSelectedMenu = (location) => {

    let path = location.pathname.split("/");
    return path[1] ?? "email-box";

}

export const getAttachmentName = attachment => {

    if (!attachment) return "N/A";

    const attachments = attachment.split("__DELIM__");

    if (attachments?.length > 1) {
        return attachments[1];
    } else {
        return attachments[0]
    }

}

export const getBillableItemsTotalPrice = (items) => {

    return items.reduce((sum, item) => {
        const price = (item.unitPrice || 0) * (item.inclusiveQty || 0);
        return sum + price;
    }, 0);

};