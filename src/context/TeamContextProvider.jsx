import React, {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import TeamService from "../services/TeamService.js";

export const TeamContext = createContext("TeamContext");

const TeamContextProvider = ({children}) => {
    const [teamList, setTeamList] = useState([]);
    const [totalTeams, setTotalTeams] = useState(0);
    const [loading, setLoading] = useState(false);

    const getTeamList = async (params) => {
        try {
            setLoading(true);
            const res = await TeamService.getTeamList(params);
            // Ensure we always set an array
            const teams = Array.isArray(res.data) ? res.data : (res.data?.teams || []);
            setTeamList(teams);
            setTotalTeams(teams.length);
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setTeamList([]); // Set empty array on error
            setTotalTeams(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TeamContext.Provider
            value={{
                getTeamList,
                teamList,
                totalTeams,
                loading,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export default TeamContextProvider;
