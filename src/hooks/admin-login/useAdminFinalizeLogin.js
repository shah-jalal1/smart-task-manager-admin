import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Toast} from '../../components/common/Toast.jsx';
import {ROOT_PATH} from '../../routes/Slug.js';

const useAdminFinalizeLogin = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get temporary admin profile from session/local storage
        const tempProfile = {
            username: 'admin_temp'
        };
        setProfile(tempProfile);
    }, []);

    const handleFinalizeUsername = async (values) => {
        try {
            // Mock API call - replace with actual finalize username API
            console.log('Finalize username:', values);
            
            Toast('success', 'Success', 'Username has been finalized successfully');
            
            // Navigate to dashboard
            navigate(ROOT_PATH);
        } catch (error) {
            Toast('error', 'Error', 'Failed to finalize username');
        }
    };

    return {
        profile,
        handleFinalizeUsername
    };
};

export default useAdminFinalizeLogin;
