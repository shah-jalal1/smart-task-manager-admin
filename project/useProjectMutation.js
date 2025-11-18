import {getErrorMessage} from "../../utils/GenericUtils.js";
import {useContext, useState} from "react";
import {ProjectContext} from "../../context/ProjectContextProvider.jsx";
import {Toast} from "../../components/common/Toast.jsx";
import ProjectService from "../../services/ProjectService.js";

const useProjectMutation = (refreshList) => {
    const {getProjectList} = useContext(ProjectContext);

    const [projectDrawerVisible, setProjectDrawerVisible] = useState(false);
    const [projectSubmitLoading, setProjectSubmitLoading] = useState(false);
    const [project, setProject] = useState(null);

    const openProjectDrawer = (project) => {
        setProjectDrawerVisible(true);
        setProject(project);
    };

    const closeProjectDrawer = () => {
        setProjectDrawerVisible(false);
        setProject(null);
    };

    const addProject = async (data) => {
        try {
            setProjectSubmitLoading(true);
            const res = await ProjectService.createProject(data);
            Toast("success", "Created", "New project has been added successfully");
            setProjectSubmitLoading(false);
            return res.data;
        } catch (error) {
            setProjectSubmitLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const editProject = async (data) => {
        try {
            setProjectSubmitLoading(true);
            const res = await ProjectService.updateProject(project._id, data);
            Toast("success", "Edited", "Project has been edited successfully");
            setProjectSubmitLoading(false);
            return res.data;
        } catch (error) {
            setProjectSubmitLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const deleteProject = async (id) => {
        try {
            await ProjectService.deleteProject(id);
            Toast("success", "Deleted", "Project has been deleted successfully");
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        }
    };

    const handleProjectSubmit = async (data) => {
        let res = null;

        if (project) {
            res = await editProject(data);
        } else {
            res = await addProject(data);
        }

        if (res) {
            closeProjectDrawer();
            getProjectList();
        }

        return res;
    };

    return {
        projectDrawerVisible,
        projectSubmitLoading,
        project,
        openProjectDrawer,
        closeProjectDrawer,
        handleProjectSubmit,
        deleteProject,
    };
};

export default useProjectMutation;
