import {useEffect} from 'react';

const useProjectFormHandler = (form, project, handleProjectSubmit) => {
    useEffect(() => {
        if (project) {
            form.setFieldsValue({
                name: project.name,
                description: project.description,
                team: project.team?._id || project.team
            });
        } else {
            form.resetFields();
        }
    }, [project, form]);

    const onFinish = (values) => {
        handleProjectSubmit(values);
    };

    return {
        onFinish
    };
};

export default useProjectFormHandler;
