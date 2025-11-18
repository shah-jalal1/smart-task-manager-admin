import {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import DashboardService from "../services/DashboardService.js";

export const DashboardContext = createContext("DashboardContext");

const DashboardContextProvider = ({children}) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [activityLogs, setActivityLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getDashboard = async () => {
        try {
            setLoading(true);
            const res = await DashboardService.getDashboard();
            
            // Extract dashboard data from response
            const dashboard = res.data?.dashboard || res.data || {};
            
            // Ensure teamSummary is an array
            if (dashboard.teamSummary && !Array.isArray(dashboard.teamSummary)) {
                dashboard.teamSummary = [];
            }
            
            // Convert tasksByStatus array to object for easier access
            if (Array.isArray(dashboard.tasksByStatus)) {
                const statusObj = {};
                dashboard.tasksByStatus.forEach(item => {
                    statusObj[item._id] = item.count;
                });
                dashboard.tasksByStatus = statusObj;
            }
            
            setDashboardData(dashboard);
            
            // Set activity logs if included in dashboard response
            if (Array.isArray(dashboard.recentActivity)) {
                setActivityLogs(dashboard.recentActivity);
            }
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setDashboardData(null);
        } finally {
            setLoading(false);
        }
    };

    const getActivityLogs = async (params) => {
        try {
            setLoading(true);
            const res = await DashboardService.getActivityLogs(params);
            // Ensure we always set an array
            setActivityLogs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setActivityLogs([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardContext.Provider
            value={{
                getDashboard,
                getActivityLogs,
                dashboardData,
                activityLogs,
                loading,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export default DashboardContextProvider;
