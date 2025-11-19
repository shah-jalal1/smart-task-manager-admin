import {useContext, useEffect} from 'react';
import {Form, Input, Select, Alert, Tag, Button} from "antd";
import useTaskFormHandler from "../../hooks/task/useTaskFormHandler.js";
import {ProjectContext} from "../../context/ProjectContextProvider.jsx";

const {TextArea} = Input;

const TaskForm = ({form, task, handleTaskSubmit, autoAssignTask}) => {
    const {onFinish, handleProjectChange, teamMembers, loadingMembers} = useTaskFormHandler(form, task, handleTaskSubmit);
    const {projectList, getProjectList} = useContext(ProjectContext);

    useEffect(() => {
        getProjectList();
    }, []);

    const getMemberDisplay = (member) => {
        const currentTasks = member.currentTasks || 0;
        const capacity = member.capacity || 0;
        const isOverloaded = currentTasks >= capacity;

        return (
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span>{member.name} ({member.role})</span>
                    {member.teamName && <span style={{fontSize: '12px', color: '#888'}}>Team: {member.teamName}</span>}
                </div>
                <Tag color={isOverloaded ? 'red' : currentTasks === capacity ? 'orange' : 'green'}>
                    {currentTasks}/{capacity} tasks
                </Tag>
            </div>
        );
    };

    const selectedMemberId = Form.useWatch('assignedMember', form);
    const selectedProjectId = Form.useWatch('project', form);
    const selectedMember = teamMembers.find(m => m._id === selectedMemberId);
    const showWarning = selectedMember && selectedMember.currentTasks >= selectedMember.capacity;

    return (
        <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                label="Task Title"
                name="title"
                rules={[{required: true, message: "Please enter task title"}]}
            >
                <Input placeholder="Enter task title" />
            </Form.Item>

            <Form.Item
                label="Description"
                name="description"
            >
                <TextArea rows={3} placeholder="Enter task description" />
            </Form.Item>

            <Form.Item
                label="Project"
                name="project"
                rules={[{required: true, message: "Please select a project"}]}
            >
                <Select 
                    placeholder="Select project"
                    onChange={(value) => handleProjectChange(value, projectList)}
                >
                    {projectList.map(project => (
                        <Select.Option key={project._id} value={project._id}>
                            {project.name} (Team: {project.team?.name || 'N/A'})
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Priority"
                name="priority"
                rules={[{required: true, message: "Please select priority"}]}
                initialValue="Medium"
            >
                <Select>
                    <Select.Option value="Low">Low</Select.Option>
                    <Select.Option value="Medium">Medium</Select.Option>
                    <Select.Option value="High">High</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Status"
                name="status"
                rules={[{required: true, message: "Please select status"}]}
                initialValue="Pending"
            >
                <Select>
                    <Select.Option value="Pending">Pending</Select.Option>
                    <Select.Option value="In Progress">In Progress</Select.Option>
                    <Select.Option value="Done">Done</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="Assign Member"
                name="assignedMember"
            >
                <Select 
                    placeholder={selectedProjectId ? "Select team member or leave unassigned" : "Please select a project first"}
                    loading={loadingMembers}
                    allowClear
                    disabled={!selectedProjectId}
                >
                    {teamMembers.map(member => (
                        <Select.Option key={member._id} value={member._id}>
                            {getMemberDisplay(member)}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            {showWarning && (
                <Alert
                    message={`⚠️ ${selectedMember.name} has ${selectedMember.currentTasks} tasks but capacity is ${selectedMember.capacity}. Assign anyway?`}
                    type="warning"
                    showIcon
                    style={{marginBottom: 16}}
                />
            )}

            {teamMembers.length > 0 && !task && (
                <Button
                    type="dashed"
                    onClick={() => {
                        const leastLoadedMember = teamMembers.reduce((prev, current) => 
                            (prev.currentTasks < current.currentTasks) ? prev : current
                        );
                        form.setFieldValue('assignedMember', leastLoadedMember._id);
                    }}
                    block
                    style={{marginBottom: 16}}
                >
                    Auto-assign to Member with Least Load
                </Button>
            )}
        </Form>
    );
};

export default TaskForm;
