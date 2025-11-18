import React, {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import TeamService from "../services/TeamService.js";

export const TeamContext = createContext("TeamContext");

const TeamContextProvider = ({children}) => {
    const [teamList, setTeamList] = useState([]);
    const [totalTeams, setTotalTeams] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({page: 1, limit: 10});

    const getTeamList = async (params = {}) => {
        try {
            setLoading(true);
            // Merge pagination with custom params
            const queryParams = {...pagination, ...params};
            const res = await TeamService.getTeamList(queryParams);
            
            // Handle different response structures
            if (res.data?.teams) {
                // Paginated response
                setTeamList(res.data.teams);
                setTotalTeams(res.data.total || res.data.teams.length);
            } else if (Array.isArray(res.data)) {
                // Direct array response
                setTeamList(res.data);
                setTotalTeams(res.data.length);
            } else {
                setTeamList([]);
                setTotalTeams(0);
            }
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setTeamList([]);
            setTotalTeams(0);
        } finally {
            setLoading(false);
        }
    };

    const updatePagination = (page, limit) => {
        setPagination({page, limit});
    };

    return (
        <TeamContext.Provider
            value={{
                getTeamList,
                teamList,
                totalTeams,
                loading,
                pagination,
                updatePagination,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export default TeamContextProvider;
