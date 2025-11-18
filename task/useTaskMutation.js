import {getErrorMessage} from "../../utils/GenericUtils.js";
import {useContext, useState} from "react";
import {TaskContext} from "../../context/TaskContextProvider.jsx";
import {Toast} from "../../components/common/Toast.jsx";
import TaskService from "../../services/TaskService.js";

const useTaskMutation = (refreshList) => {
    const {getTaskList} = useContext(TaskContext);

    const [taskDrawerVisible, setTaskDrawerVisible] = useState(false);
    const [taskSubmitLoading, setTaskSubmitLoading] = useState(false);
    const [task, setTask] = useState(null);

    const openTaskDrawer = (task) => {
        setTaskDrawerVisible(true);
        setTask(task);
    };

    const closeTaskDrawer = () => {
        setTaskDrawerVisible(false);
        setTask(null);
    };

    const addTask = async (data) => {
        try {
            setTaskSubmitLoading(true);
            const res = await TaskService.createTask(data);
            Toast("success", "Created", "New task has been added successfully");
            setTaskSubmitLoading(false);
            return res.data;
        } catch (error) {
            setTaskSubmitLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const editTask = async (data) => {
        try {
            setTaskSubmitLoading(true);
            const res = await TaskService.updateTask(task._id, data);
            Toast("success", "Edited", "Task has been edited successfully");
            setTaskSubmitLoading(false);
            return res.data;
        } catch (error) {
            setTaskSubmitLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const deleteTask = async (id) => {
        try {
            await TaskService.deleteTask(id);
            Toast("success", "Deleted", "Task has been deleted successfully");
            refreshList();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        }
    };

    const autoAssignTask = async (id) => {
        try {
            const res = await TaskService.autoAssignTask(id);
            Toast("success", "Auto-assigned", "Task has been auto-assigned successfully");
            refreshList();
            return res.data;
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            return null;
        }
    };

    const handleTaskSubmit = async (data) => {
        let res = null;

        if (task) {
            res = await editTask(data);
        } else {
            res = await addTask(data);
        }

        if (res) {
            closeTaskDrawer();
            getTaskList();
        }

        return res;
    };

    return {
        taskDrawerVisible,
        taskSubmitLoading,
        task,
        openTaskDrawer,
        closeTaskDrawer,
        handleTaskSubmit,
        deleteTask,
        autoAssignTask,
    };
};

export default useTaskMutation;
