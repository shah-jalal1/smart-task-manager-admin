import {useContext, useEffect, useState} from 'react';
import {TaskContext} from "../../context/TaskContextProvider.jsx";

const useTaskList = () => {
    const {taskList, getTaskList, totalTasks, loading} = useContext(TaskContext);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({
        status: undefined,
        priority: undefined
    });

    useEffect(() => {
        getAllTasks();
    }, [refresh, filters]);

    const getAllTasks = async () => {
        const params = {};
        if (filters.status) params.status = filters.status;
        if (filters.priority) params.priority = filters.priority;
        await getTaskList(params);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const refreshList = () => {
        setRefresh(!refresh);
    };

    return {
        loading,
        taskList,
        totalTasks,
        refreshList,
        filters,
        handleFilterChange
    };
};

export default useTaskList;
