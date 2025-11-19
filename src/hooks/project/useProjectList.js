import {useContext, useEffect} from 'react';
import {ProjectContext} from '../../context/ProjectContextProvider.jsx';

const useProjectList = () => {
    const {getProjectList, projectList, totalProjects, loading} = useContext(ProjectContext);

    useEffect(() => {
        refreshList();
    }, []);

    const refreshList = () => {
        getProjectList();
    };

    return {
        loading,
        projectList,
        totalProjects,
        refreshList
    };
};

export default useProjectList;
