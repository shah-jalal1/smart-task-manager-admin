/**
 * Created by WebStorm.
 * User: Mehedi Hasan
 * Date: 12 May 2025
 * Time: 3:56 PM
 * Email: mdmehedihasanroni28@gmail.com
 */

import {useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import UserService from "../services/UserService.js";
import {mimeToExtension} from "../constant/ConstantVariables.js";

const useQRCode = () => {

    const [qrCodeLoading, setQRCodeLoading] = useState(false);
    const [qrCode, setQRCode] = useState(null);
    const [extension, setExtension] = useState("");

    const getQRCode = async employeeId => {
        try {

            setQRCodeLoading(true);

            const response = await UserService.getQRCode(employeeId);

            const blob = new Blob([response.data], {type: response.headers['content-type']});

            const contentType = response.headers["content-type"];
            const extension = mimeToExtension[contentType] || "";
            setExtension(extension);

            const url = URL.createObjectURL(blob);

            setQRCode(url);


            setQRCodeLoading(false);

        } catch (error) {

            setQRCodeLoading(false);

            const message = getErrorMessage(error);
            Toast("error", "Error", message);

        }
    }

    const downloadQRCode = qrCodeName => {
        try {

            console.log("QRCODE NAME", qrCodeName)

            console.log("AA", qrCode)

            if (!qrCode) return;

            const link = document.createElement('a');
            link.href = qrCode;
            link.setAttribute('download', `${qrCodeName}.${extension}`); // or .png depending on the type
            document.body.appendChild(link);
            link.click();
            link.remove();

        } catch (error) {

            const message = getErrorMessage(error);
            Toast("error", "Error", message);

        }

    };

    return {
        qrCode,
        qrCodeLoading,
        downloadQRCode,
        getQRCode,
    }
};

export default useQRCode;