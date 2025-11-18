import {createContext, useState} from "react";
import TaskService from "../services/TaskService.js";
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";

export const TaskContext = createContext({});

const TaskContextProvider = ({children}) => {
    const [taskList, setTaskList] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    const [loading, setLoading] = useState(false);

    const getTaskList = async (params = {}) => {
        try {
            setLoading(true);
            const res = await TaskService.getTaskList(params);
            setTaskList(res.data.data || []);
            setTotalTasks(res.data.total || 0);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                taskList,
                totalTasks,
                loading,
                getTaskList
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export default TaskContextProvider;
