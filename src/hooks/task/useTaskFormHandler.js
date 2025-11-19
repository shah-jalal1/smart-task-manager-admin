import {useEffect, useState} from 'react';
import TeamService from '../../services/TeamService.js';
import ProjectService from '../../services/ProjectService.js';
import {getErrorMessage} from '../../utils/GenericUtils.js';
import {Toast} from '../../components/common/Toast.jsx';

const useTaskFormHandler = (form, task, handleTaskSubmit) => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                project: task.project?._id || task.project,
                priority: task.priority,
                status: task.status,
                assignedMember: task.assignedMember?._id || task.assignedMember
            });

            if (task.project) {
                const projectId = task.project._id || task.project;
                loadTeamMembers(projectId);
            }
        } else {
            form.resetFields();
            setTeamMembers([]); // Clear members when form is reset for new task
        }
    }, [task, form]);

    const loadTeamMembers = async (projectId) => {
        try {
            setLoadingMembers(true);
            const project = await ProjectService.getProject(projectId);
            const teamId = project.data?.team?._id || project.data?.team;
            
            if (teamId) {
                const teamRes = await TeamService.getTeamWorkload(teamId);
                // Handle response structure: { success: true, team: { _id, name, members: [...] } }
                const members = teamRes.data?.team?.members || [];
                setTeamMembers(members);
            } else {
                setTeamMembers([]);
            }
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
            setTeamMembers([]);
        } finally {
            setLoadingMembers(false);
        }
    };

    const handleProjectChange = (projectId, projectList) => {
        form.setFieldValue('assignedMember', undefined);
        setTeamMembers([]);
        
        const selectedProject = projectList.find(p => p._id === projectId);
        if (selectedProject?.team) {
            const teamId = selectedProject.team._id || selectedProject.team;
            loadTeamMembersFromTeam(teamId);
        }
    };

    const loadTeamMembersFromTeam = async (teamId) => {
        try {
            setLoadingMembers(true);
            const teamRes = await TeamService.getTeamWorkload(teamId);
            // Handle response structure: { success: true, team: { _id, name, members: [...] } }
            const members = teamRes.data?.team?.members || [];
            setTeamMembers(members);
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
            setTeamMembers([]);
        } finally {
            setLoadingMembers(false);
        }
    };

    const onFinish = (values) => {
        handleTaskSubmit(values);
    };

    return {
        onFinish,
        handleProjectChange,
        teamMembers,
        loadingMembers
    };
};

export default useTaskFormHandler;
