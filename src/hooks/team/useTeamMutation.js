import {useState} from 'react';
import TeamService from '../../services/TeamService.js';
import {Toast} from '../../components/common/Toast.jsx';
import {getErrorMessage} from '../../utils/GenericUtils.js';

const useTeamMutation = (refreshList) => {
    const [teamDrawerVisible, setTeamDrawerVisible] = useState(false);
    const [teamSubmitLoading, setTeamSubmitLoading] = useState(false);
    const [team, setTeam] = useState(null);

    const openTeamDrawer = (teamData) => {
        setTeam(teamData);
        setTeamDrawerVisible(true);
    };

    const closeTeamDrawer = () => {
        setTeam(null);
        setTeamDrawerVisible(false);
    };

    const handleTeamSubmit = async (values) => {
        try {
            setTeamSubmitLoading(true);
            if (team) {
                await TeamService.updateTeam(team._id, values);
                Toast('success', 'Success', 'Team updated successfully');
            } else {
                await TeamService.createTeam(values);
                Toast('success', 'Success', 'Team created successfully');
            }
            closeTeamDrawer();
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
        } finally {
            setTeamSubmitLoading(false);
        }
    };

    const deleteTeam = async (teamId) => {
        try {
            await TeamService.deleteTeam(teamId);
            Toast('success', 'Success', 'Team deleted successfully');
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
        }
    };

    return {
        teamDrawerVisible,
        teamSubmitLoading,
        team,
        openTeamDrawer,
        closeTeamDrawer,
        handleTeamSubmit,
        deleteTeam
    };
};

export default useTeamMutation;
