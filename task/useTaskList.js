import {useContext, useEffect, useState} from 'react';
import {TaskContext} from "../../context/TaskContextProvider.jsx";

const useTaskList = () => {
    const {taskList, getTaskList, totalTasks, loading} = useContext(TaskContext);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        getAllTasks();
    }, [refresh, filters]);

    const getAllTasks = async () => {
        await getTaskList(filters);
    };

    const refreshList = () => {
        setRefresh(!refresh);
    };

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    return {
        loading,
        taskList,
        totalTasks,
        refreshList,
        applyFilters,
        filters,
    };
};

export default useTaskList;
