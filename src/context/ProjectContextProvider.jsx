import React, {createContext, useState} from 'react';
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";
import ProjectService from "../services/ProjectService.js";

export const ProjectContext = createContext("ProjectContext");

const ProjectContextProvider = ({children}) => {
    const [projectList, setProjectList] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [loading, setLoading] = useState(false);

    const getProjectList = async (params) => {
        try {
            setLoading(true);
            const res = await ProjectService.getProjectList(params);
            // Ensure we always set an array
            const projects = Array.isArray(res.data) ? res.data : (res.data?.projects || []);
            setProjectList(projects);
            setTotalProjects(projects.length);
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
            setProjectList([]); // Set empty array on error
            setTotalProjects(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                getProjectList,
                projectList,
                totalProjects,
                loading,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContextProvider;
