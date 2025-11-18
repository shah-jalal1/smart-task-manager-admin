import React, {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import ProjectService from "../services/ProjectService.js";

export const ProjectContext = createContext("ProjectContext");

const ProjectContextProvider = ({children}) => {
    const [projectList, setProjectList] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({page: 1, limit: 10});

    const getProjectList = async (params = {}) => {
        try {
            setLoading(true);
            // Merge pagination with custom params
            const queryParams = {...pagination, ...params};
            const res = await ProjectService.getProjectList(queryParams);
            
            // Handle different response structures
            if (res.data?.projects) {
                // Paginated response
                setProjectList(res.data.projects);
                setTotalProjects(res.data.total || res.data.projects.length);
            } else if (Array.isArray(res.data)) {
                // Direct array response
                setProjectList(res.data);
                setTotalProjects(res.data.length);
            } else {
                setProjectList([]);
                setTotalProjects(0);
            }
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setProjectList([]);
            setTotalProjects(0);
        } finally {
            setLoading(false);
        }
    };

    const updatePagination = (page, limit) => {
        setPagination({page, limit});
    };

    return (
        <ProjectContext.Provider
            value={{
                getProjectList,
                projectList,
                totalProjects,
                loading,
                pagination,
                updatePagination,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContextProvider;
