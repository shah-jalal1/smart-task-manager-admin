import {useContext, useEffect} from 'react';
import {Form, Input, Select} from "antd";
import useProjectFormHandler from "../../hooks/project/useProjectFormHandler.js";
import {TeamContext} from "../../context/TeamContextProvider.jsx";

const {TextArea} = Input;

const ProjectForm = ({form, project, handleProjectSubmit}) => {
    const {onFinish} = useProjectFormHandler(form, project, handleProjectSubmit);
    const {teamList, getTeamList} = useContext(TeamContext);

    useEffect(() => {
        getTeamList();
    }, []);

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Project Name"
                name="name"
                rules={[{required: true, message: "Please enter project name"}]}
            >
                <Input placeholder="Enter project name" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
            >
                <TextArea rows={4} placeholder="Enter project description" />
            </Form.Item>

            <Form.Item
                label="Assign Team"
                name="team"
                rules={[{required: true, message: "Please select a team"}]}
            >
                <Select placeholder="Select team">
                    {teamList.map(team => (
                        <Select.Option key={team._id} value={team._id}>
                            {team.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ProjectForm;
