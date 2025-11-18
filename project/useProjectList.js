import {useContext, useEffect, useState} from 'react';
import {ProjectContext} from "../../context/ProjectContextProvider.jsx";

const useProjectList = () => {
    const {projectList, getProjectList, totalProjects, loading} = useContext(ProjectContext);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        getAllProjects();
    }, [refresh]);

    const getAllProjects = async () => {
        await getProjectList();
    };

    const refreshList = () => {
        setRefresh(!refresh);
    };

    return {
        loading,
        projectList,
        totalProjects,
        refreshList,
    };
};

export default useProjectList;
