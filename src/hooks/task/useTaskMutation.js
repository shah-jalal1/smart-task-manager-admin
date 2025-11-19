import {useState} from 'react';
import TaskService from '../../services/TaskService.js';
import {Toast} from '../../components/common/Toast.jsx';
import {getErrorMessage} from '../../utils/GenericUtils.js';

const useTaskMutation = (refreshList) => {
    const [taskDrawerVisible, setTaskDrawerVisible] = useState(false);
    const [taskSubmitLoading, setTaskSubmitLoading] = useState(false);
    const [task, setTask] = useState(null);

    const openTaskDrawer = (taskData) => {
        setTask(taskData);
        setTaskDrawerVisible(true);
    };

    const closeTaskDrawer = () => {
        setTask(null);
        setTaskDrawerVisible(false);
    };

    const handleTaskSubmit = async (values) => {
        try {
            setTaskSubmitLoading(true);
            if (task) {
                await TaskService.updateTask(task._id, values);
                Toast('success', 'Success', 'Task updated successfully');
            } else {
                await TaskService.createTask(values);
                Toast('success', 'Success', 'Task created successfully');
            }
            closeTaskDrawer();
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
        } finally {
            setTaskSubmitLoading(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await TaskService.deleteTask(taskId);
            Toast('success', 'Success', 'Task deleted successfully');
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast('error', 'Error', message);
        }
    };

    const autoAssignTask = async (taskId) => {
        try {
            const response = await TaskService.autoAssignTask(taskId);
            Toast('success', 'Success', response.data?.message || 'Task auto-assigned successfully');
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            // Provide more specific error message
            const errorMsg = message.includes('null') 
                ? 'Unable to auto-assign. Make sure the task has a project with a team assigned.'
                : message;
            Toast('error', 'Error', errorMsg);
        }
    };

    return {
        taskDrawerVisible,
        taskSubmitLoading,
        task,
        openTaskDrawer,
        closeTaskDrawer,
        handleTaskSubmit,
        deleteTask,
        autoAssignTask
    };
};

export default useTaskMutation;
