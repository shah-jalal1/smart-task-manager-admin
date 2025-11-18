import {Table, Form, Popconfirm, Tag, Space, Select} from "antd";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import FormDrawer from "../../components/drawer/FormDrawer.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {getIcon} from "../../components/Icons.jsx";
import IconButton from "../../components/buttons/IconButton.jsx";
import useTaskList from "../../hooks/task/useTaskList.js";
import useTaskMutation from "../../hooks/task/useTaskMutation.js";
import TaskForm from "./TaskForm.jsx";

const {Option} = Select;

const TaskListView = () => {
    const [form] = Form.useForm();

    const {
        loading,
        taskList,
        totalTasks,
        refreshList,
        filters,
        handleFilterChange
    } = useTaskList();

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

    const columns = [
        {
            title: "Task Title",
            dataIndex: "title",
            key: "title",
            render: (title) => <strong>{title}</strong>
        },
        {
            title: "Project",
            key: "project",
            render: (record) => (
                <Tag color="blue">
                    {record?.project?.name || 'No Project'}
                </Tag>
            )
        },
        {
            title: "Assigned To",
            key: "assignedTo",
            render: (record) => (
                record?.assignedTo ? (
                    <Tag color="green">
                        {record.assignedTo.name}
                    </Tag>
                ) : (
                    <Tag>Unassigned</Tag>
                )
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const colors = {
                    'Pending': 'orange',
                    'In Progress': 'blue',
                    'Completed': 'green'
                };
                return <Tag color={colors[status] || 'default'}>{status}</Tag>;
            }
        },
        {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
            render: (priority) => {
                const colors = {
                    'Low': 'green',
                    'Medium': 'orange',
                    'High': 'red'
                };
                return <Tag color={colors[priority] || 'default'}>{priority}</Tag>;
            }
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space>
                    {!record.assignedTo && (
                        <IconButton
                            icon={getIcon("user")}
                            onClick={() => autoAssignTask(record._id)}
                            title="Auto Assign"
                        />
                    )}
                    <IconButton
                        icon={getIcon("edit")}
                        onClick={() => openTaskDrawer(record)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Delete Task"
                        description="Are you sure you want to delete this task?"
                        onConfirm={() => deleteTask(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement="topRight"
                    >
                        <span>
                            <IconButton
                                icon={getIcon("delete")}
                                title="Delete"
                                danger
                            />
                        </span>
                    </Popconfirm>
                </Space>
            ),
            width: 200,
            align: "center"
        },
    ];

    const pageHeader = (
        <CustomPageHeader
            title={`Tasks (${totalTasks})`}
            extra={[
                <Select
                    key="status-filter"
                    placeholder="Filter by Status"
                    style={{width: 150, marginRight: 8}}
                    allowClear
                    onChange={(value) => handleFilterChange('status', value)}
                    value={filters.status}
                >
                    <Option value="Pending">Pending</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Completed">Completed</Option>
                </Select>,
                <Select
                    key="priority-filter"
                    placeholder="Filter by Priority"
                    style={{width: 150, marginRight: 8}}
                    allowClear
                    onChange={(value) => handleFilterChange('priority', value)}
                    value={filters.priority}
                >
                    <Option value="Low">Low</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="High">High</Option>
                </Select>,
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
            <Table
                columns={columns}
                dataSource={taskList}
                loading={loading}
                pagination={{
                    total: totalTasks,
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} tasks`
                }}
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
                />
            </FormDrawer>
        </PageWrapper>
    );
};

export default TaskListView;
