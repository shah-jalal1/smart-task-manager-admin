import {useEffect, useState} from "react";
import TeamService from "../../services/TeamService.js";

const useTaskFormHandler = (form, task, handleTaskSubmit) => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    useEffect(() => {
        if (task) {
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                project: task.project?._id || task.project,
                assignedMember: task.assignedMember?._id || task.assignedMember,
                priority: task.priority,
                status: task.status,
            });
            
            if (task.project?.team) {
                loadTeamMembers(task.project.team._id || task.project.team);
            }
        } else {
            form.resetFields();
        }
    }, [task, form]);

    const loadTeamMembers = async (teamId) => {
        if (!teamId) return;
        
        try {
            setLoadingMembers(true);
            const res = await TeamService.getTeamWorkload(teamId);
            setTeamMembers(res.data.members || []);
        } catch (error) {
            console.error("Error loading team members:", error);
        } finally {
            setLoadingMembers(false);
        }
    };

    const handleProjectChange = async (projectId, projects) => {
        const project = projects.find(p => p._id === projectId);
        setSelectedProject(project);
        
        if (project?.team) {
            const teamId = project.team._id || project.team;
            await loadTeamMembers(teamId);
        } else {
            setTeamMembers([]);
        }
        
        form.setFieldValue('assignedMember', undefined);
    };

    const onFinish = async (values) => {
        await handleTaskSubmit(values);
    };

    return {
        onFinish,
        handleProjectChange,
        teamMembers,
        loadingMembers,
    };
};

export default useTaskFormHandler;
