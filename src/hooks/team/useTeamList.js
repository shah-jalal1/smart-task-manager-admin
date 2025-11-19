import {useContext, useEffect} from 'react';
import {TeamContext} from '../../context/TeamContextProvider.jsx';

const useTeamList = () => {
    const {getTeamList, teamList, totalTeams, loading} = useContext(TeamContext);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        getTeamList();
    };

    return {
        loading,
        teamList,
        totalTeams,
        refreshList
    };
};

export default useTeamList;
