import {useState} from 'react';
import {FORGOT_USERNAME, LOST_DEVICE} from '../../constant/ConstantVariables.js';
import {Toast} from '../../components/common/Toast.jsx';

const useNeedHelpLogin = () => {
    const [loading, setLoading] = useState(false);
    const [helpType, setHelpType] = useState(LOST_DEVICE);

    const handleUserHelpType = (e) => {
        setHelpType(e.target.value);
    };

    const createUserHelpRequest = async (values) => {
        try {
            setLoading(true);
            // Mock API call - replace with actual API when available
            console.log('Help request submitted:', values);
            Toast('success', 'Request Sent', 'Your help request has been submitted successfully');
        } catch (error) {
            Toast('error', 'Error', 'Failed to submit help request');
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        createUserHelpRequest,
        handleUserHelpType,
        helpType
    };
};

export default useNeedHelpLogin;
