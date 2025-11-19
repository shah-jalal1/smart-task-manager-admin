import {useContext, useEffect, useState} from 'react';
import {TaskContext} from '../../context/TaskContextProvider.jsx';

const useTaskList = () => {
    const {getTaskList, taskList, totalTasks, loading} = useContext(TaskContext);
    const [filters, setFilters] = useState({
        search: '',
        status: undefined,
        priority: undefined
    });

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        getTaskList(filters);
    };

    const applyFilters = (newFilters) => {
        setFilters(newFilters);
        getTaskList(newFilters);
    };

    return {
        loading,
        taskList,
        totalTasks,
        refreshList,
        applyFilters,
        filters
    };
};

export default useTaskList;
