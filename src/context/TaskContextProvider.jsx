import React, {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import TaskService from "../services/TaskService.js";

export const TaskContext = createContext("TaskContext");

const TaskContextProvider = ({children}) => {
    const [taskList, setTaskList] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({page: 1, limit: 10});

    const getTaskList = async (params = {}) => {
        try {
            setLoading(true);
            // Merge pagination with custom params
            const queryParams = {...pagination, ...params};
            const res = await TaskService.getTaskList(queryParams);
            
            // Handle different response structures
            if (res.data?.tasks) {
                // Paginated response
                setTaskList(res.data.tasks);
                setTotalTasks(res.data.total || res.data.tasks.length);
            } else if (Array.isArray(res.data)) {
                // Direct array response
                setTaskList(res.data);
                setTotalTasks(res.data.length);
            } else {
                setTaskList([]);
                setTotalTasks(0);
            }
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setTaskList([]);
            setTotalTasks(0);
        } finally {
            setLoading(false);
        }
    };

    const updatePagination = (page, limit) => {
        setPagination({page, limit});
    };

    return (
        <TaskContext.Provider
            value={{
                getTaskList,
                taskList,
                totalTasks,
                loading,
                pagination,
                updatePagination,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
