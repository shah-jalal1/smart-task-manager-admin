import {useState} from 'react';
import ProjectService from '../../services/ProjectService.js';
import {Toast} from '../../components/common/Toast.jsx';
import {getErrorMessage} from '../../utils/GenericUtils.js';

const useProjectMutation = (refreshList) => {
    const [projectDrawerVisible, setProjectDrawerVisible] = useState(false);
    const [projectSubmitLoading, setProjectSubmitLoading] = useState(false);
    const [project, setProject] = useState(null);

    const openProjectDrawer = (projectData) => {
        setProject(projectData);
        setProjectDrawerVisible(true);
    };

    const closeProjectDrawer = () => {
        setProject(null);
        setProjectDrawerVisible(false);
    };

    const handleProjectSubmit = async (values) => {
        try {
            setProjectSubmitLoading(true);
            if (project) {
                await ProjectService.updateProject(project._id, values);
                Toast('success', 'Success', 'Project updated successfully');
            } else {
                await ProjectService.createProject(values);
                Toast('success', 'Success', 'Project created successfully');
            }
            closeProjectDrawer();
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
        } finally {
            setProjectSubmitLoading(false);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            await ProjectService.deleteProject(projectId);
            Toast('success', 'Success', 'Project deleted successfully');
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
        }
    };

    return {
        projectDrawerVisible,
        projectSubmitLoading,
        project,
        openProjectDrawer,
        closeProjectDrawer,
        handleProjectSubmit,
        deleteProject
    };
};

export default useProjectMutation;
