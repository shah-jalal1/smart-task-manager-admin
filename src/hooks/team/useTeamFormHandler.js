import {useEffect} from 'react';

const useTeamFormHandler = (form, team, handleTeamSubmit) => {
    useEffect(() => {
        if (team) {
            form.setFieldsValue({
                name: team.name,
                members: team.members || []
            });
        } else {
            form.resetFields();
        }
    }, [team, form]);

    const onFinish = (values) => {
        handleTeamSubmit(values);
    };

    return {
        onFinish
    };
};

export default useTeamFormHandler;
