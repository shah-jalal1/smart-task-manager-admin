import React from 'react';
import {Table, Form, Input, Col, Popconfirm, Select, Tag, Tooltip} from "antd";
import SearchCard from "../../components/common/SearchCard.jsx";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import FormDrawer from "../../components/drawer/FormDrawer.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {getIcon} from "../../components/Icons.jsx";
import DefaultBtn from "../../components/buttons/DefaultBtn.jsx";
import useTaskList from "../../hooks/task/useTaskList.js";
import useTaskMutation from "../../hooks/task/useTaskMutation.js";
import TaskForm from "./TaskForm.jsx";

const TaskListView = () => {
    const [form] = Form.useForm();

    const {loading, taskList, totalTasks, refreshList, applyFilters, filters} = useTaskList();

    const {
        taskDrawerVisible,
        taskSubmitLoading,
        task,
        openTaskDrawer,
        closeTaskDrawer,
        handleTaskSubmit,
        deleteTask,
        autoAssignTask,
    } = useTaskMutation(refreshList);

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'High': return 'red';
            case 'Medium': return 'orange';
            case 'Low': return 'blue';
            default: return 'default';
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Done': return 'green';
            case 'In Progress': return 'blue';
            case 'Pending': return 'default';
            default: return 'default';
        }
    };

    const columns = [
        {
            title: "Task Title",
            key: "title",
            width: 200,
            render: (e) => <strong>{e?.title}</strong>
        },
        {
            title: "Project",
            key: "project",
            width: 150,
            render: (e) => e?.project?.name || "-"
        },
        {
            title: "Assigned To",
            key: "assignedMember",
            width: 150,
            render: (e) => {
                if (e?.assignedMemberName && e?.assignedMemberName !== 'Unassigned') {
                    return <Tag color="blue">{e.assignedMemberName}</Tag>;
                }
                return <Tag>Unassigned</Tag>;
            }
        },
        {
            title: "Priority",
            key: "priority",
            width: 100,
            render: (e) => <Tag color={getPriorityColor(e?.priority)}>{e?.priority}</Tag>
        },
        {
            title: "Status",
            key: "status",
            width: 120,
            render: (e) => <Tag color={getStatusColor(e?.status)}>{e?.status}</Tag>
        },
        {
            title: "Action",
            key: "action",
            render: (record) => {
                const isUnassigned = !record.assignedMember || record.assignedMemberName === 'Unassigned';
                const hasProject = record.project && record.project._id;
                const canAutoAssign = isUnassigned && hasProject;
                
                return (
                    <div style={{display: "flex", gap: 8}}>
                        {isUnassigned && (
                            <Tooltip title={
                                canAutoAssign 
                                    ? "Auto-assign to member with least load" 
                                    : "Task must have a project assigned to auto-assign"
                            }>
                                <Popconfirm
                                    title="Auto-assign this task to the member with the least workload?"
                                    onConfirm={() => autoAssignTask(record._id)}
                                    okText="Yes"
                                    cancelText="No"
                                    disabled={!canAutoAssign}
                                >
                                    <DefaultBtn
                                        icon={getIcon("user")}
                                        style={{
                                            backgroundColor: canAutoAssign ? '#52c41a' : '#d9d9d9', 
                                            color: 'white',
                                            cursor: canAutoAssign ? 'pointer' : 'not-allowed'
                                        }}
                                        disabled={!canAutoAssign}
                                    />
                                </Popconfirm>
                            </Tooltip>
                        )}
                        <DefaultBtn
                            icon={getIcon("edit")}
                            onClick={() => openTaskDrawer(record)}
                        />
                        <Popconfirm
                            title="Are you sure you want to delete this task?"
                            onConfirm={() => deleteTask(record._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DefaultBtn
                                icon={getIcon("delete")}
                                danger
                            />
                        </Popconfirm>
                    </div>
                );
            },
            width: 180,
            align: "center"
        },
    ];

    const pageHeader = (
        <CustomPageHeader
            title="Tasks"
            extra={[
                <PrimaryBtn
                    key={1}
                    btnName="Create New Task"
                    onClick={() => openTaskDrawer(null)}
                />
            ]}
        />
    );

    return (
        <PageWrapper pageHeader={pageHeader}>
            <div>
                <SearchCard title="Total Tasks" count={totalTasks}>
                    <Col md={4}>
                        <Input 
                            allowClear 
                            placeholder="Search tasks"
                            onChange={(e) => applyFilters({...filters, search: e.target.value})}
                        />
                    </Col>
                    <Col md={4}>
                        <Select 
                            placeholder="Filter by Status"
                            allowClear
                            style={{width: '100%'}}
                            onChange={(value) => applyFilters({...filters, status: value})}
                        >
                            <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="In Progress">In Progress</Select.Option>
                            <Select.Option value="Done">Done</Select.Option>
                        </Select>
                    </Col>
                    <Col md={4}>
                        <Select 
                            placeholder="Filter by Priority"
                            allowClear
                            style={{width: '100%'}}
                            onChange={(value) => applyFilters({...filters, priority: value})}
                        >
                            <Select.Option value="High">High</Select.Option>
                            <Select.Option value="Medium">Medium</Select.Option>
                            <Select.Option value="Low">Low</Select.Option>
                        </Select>
                    </Col>
                </SearchCard>

                <Table
                    columns={columns}
                    dataSource={taskList}
                    loading={loading}
                    pagination={false}
                    rowKey={(row) => row._id}
                />

                <FormDrawer
                    open={taskDrawerVisible}
                    closeDrawer={closeTaskDrawer}
                    title={`${task ? "Edit" : "Add New"} Task`}
                    btnNameOk={task ? "Confirm Edit Task" : "Confirm New Task"}
                    handleOk={() => form.submit()}
                    loading={taskSubmitLoading}
                    handleCancel={closeTaskDrawer}
                >
                    <TaskForm
                        form={form}
                        task={task}
                        handleTaskSubmit={handleTaskSubmit}
                        autoAssignTask={autoAssignTask}
                    />
                </FormDrawer>
            </div>
        </PageWrapper>
    );
};

export default TaskListView;
