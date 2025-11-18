import React, {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import TaskService from "../services/TaskService.js";

export const TaskContext = createContext("TaskContext");

const TaskContextProvider = ({children}) => {
    const [taskList, setTaskList] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [loading, setLoading] = useState(false);

    const getTaskList = async (params) => {
        try {
            setLoading(true);
            const res = await TaskService.getTaskList(params);
            // Ensure we always set an array
            const tasks = Array.isArray(res.data) ? res.data : (res.data?.tasks || []);
            setTaskList(tasks);
            setTotalTasks(tasks.length);
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setTaskList([]); // Set empty array on error
            setTotalTasks(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                getTaskList,
                taskList,
                totalTasks,
                loading,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
