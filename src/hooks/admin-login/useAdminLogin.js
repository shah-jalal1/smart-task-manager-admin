import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Toast} from '../../components/common/Toast.jsx';
import {ADMIN_LOGIN_FINALIZE_PATH} from '../../routes/Slug.js';

const useAdminLogin = () => {
    const [loginLoading, setLoginLoading] = useState(false);
    const navigate = useNavigate();

    const adminLogin = async (values) => {
        try {
            setLoginLoading(true);
            // Mock API call - replace with actual admin login API
            console.log('Admin login:', values);
            
            // Simulate successful login
            Toast('success', 'Login Successful', 'You have been logged in as admin');
            
            // Navigate to finalize page
            navigate(ADMIN_LOGIN_FINALIZE_PATH);
        } catch (error) {
            Toast('error', 'Login Failed', 'Invalid admin credentials');
        } finally {
            setLoginLoading(false);
        }
    };

    return {
        loginLoading,
        adminLogin
    };
};

export default useAdminLogin;
