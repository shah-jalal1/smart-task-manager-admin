import {getErrorMessage} from "../../utils/GenericUtils.js";
import {useContext, useState} from "react";
import {TeamContext} from "../../context/TeamContextProvider.jsx";
import {Toast} from "../../components/common/Toast.jsx";
import TeamService from "../../services/TeamService.js";

const useTeamMutation = (refreshList) => {
    const {getTeamList} = useContext(TeamContext);

    const [teamDrawerVisible, setTeamDrawerVisible] = useState(false);
    const [teamSubmitLoading, setTeamSubmitLoading] = useState(false);
    const [team, setTeam] = useState(null);

    const openTeamDrawer = (team) => {
        setTeamDrawerVisible(true);
        setTeam(team);
    };

    const closeTeamDrawer = () => {
        setTeamDrawerVisible(false);
        setTeam(null);
    };

    const addTeam = async (data) => {
        try {
            setTeamSubmitLoading(true);
            const res = await TeamService.createTeam(data);
            Toast("success", "Created", "New team has been added successfully");
            setTeamSubmitLoading(false);
            return res.data;
        } catch (error) {
            setTeamSubmitLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const editTeam = async (data) => {
        try {
            setTeamSubmitLoading(true);
            const res = await TeamService.updateTeam(team._id, data);
            Toast("success", "Edited", "Team has been edited successfully");
            setTeamSubmitLoading(false);
            return res.data;
        } catch (error) {
            setTeamSubmitLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const deleteTeam = async (id) => {
        try {
            await TeamService.deleteTeam(id);
            Toast("success", "Deleted", "Team has been deleted successfully");
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        }
    };

    const handleTeamSubmit = async (data) => {
        let res = null;

        if (team) {
            res = await editTeam(data);
        } else {
            res = await addTeam(data);
        }

        if (res) {
            closeTeamDrawer();
            getTeamList();
        }

        return res;
    };

    return {
        teamDrawerVisible,
        teamSubmitLoading,
        team,
        openTeamDrawer,
        closeTeamDrawer,
        handleTeamSubmit,
        deleteTeam,
    };
};

export default useTeamMutation;
