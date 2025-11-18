import {createContext, useState} from "react";
import ProjectService from "../services/ProjectService.js";
import {getErrorMessage} from "../utils/GenericUtils.js";
import {Toast} from "../components/common/Toast.jsx";

export const ProjectContext = createContext({});

const ProjectContextProvider = ({children}) => {
    const [projectList, setProjectList] = useState([]);
    const [totalProjects, setTotalProjects] = useState(0);
    const [loading, setLoading] = useState(false);

    const getProjectList = async (params = {}) => {
        try {
            setLoading(true);
            const res = await ProjectService.getProjectList(params);
            setProjectList(res.data.data || []);
            setTotalProjects(res.data.total || 0);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                projectList,
                totalProjects,
                loading,
                getProjectList
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContextProvider;
