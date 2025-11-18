import {useContext, useEffect, useState} from 'react';
import {TeamContext} from "../../context/TeamContextProvider.jsx";

const useTeamList = () => {
    const {teamList, getTeamList, totalTeams, loading} = useContext(TeamContext);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getAllTeams();
    }, [refresh]);

    const getAllTeams = async () => {
        await getTeamList();
    };

    const refreshList = () => {
        setRefresh(!refresh);
    };

    return {
        loading,
        teamList,
        totalTeams,
        refreshList,
    };
};

export default useTeamList;
