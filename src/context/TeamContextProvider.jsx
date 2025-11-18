import {createContext, useState} from "react";
import TeamService from "../services/TeamService.js";
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";

export const TeamContext = createContext({});

const TeamContextProvider = ({children}) => {
    const [teamList, setTeamList] = useState([]);
    const [totalTeams, setTotalTeams] = useState(0);
    const [loading, setLoading] = useState(false);

    const getTeamList = async (params = {}) => {
        try {
            setLoading(true);
            const res = await TeamService.getTeamList(params);
            setTeamList(res.data.data || []);
            setTotalTeams(res.data.total || 0);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        }
    };

    return (
        <TeamContext.Provider
            value={{
                teamList,
                totalTeams,
                loading,
                getTeamList
            }}
        >
            {children}
        </TeamContext.Provider>
    );
};

export default TeamContextProvider;
