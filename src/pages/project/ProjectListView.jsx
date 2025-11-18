import React from 'react';
import {Table, Form, Popconfirm, Tag, Space} from "antd";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import FormDrawer from "../../components/drawer/FormDrawer.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {getIcon} from "../../components/Icons.jsx";
import IconButton from "../../components/buttons/IconButton.jsx";
import useProjectList from "../../hooks/project/useProjectList.js";
import useProjectMutation from "../../hooks/project/useProjectMutation.js";
import ProjectForm from "./ProjectForm.jsx";

const ProjectListView = () => {
    const [form] = Form.useForm();

    const {loading, projectList, totalProjects, refreshList} = useProjectList();

    const {
        projectDrawerVisible,
        projectSubmitLoading,
        project,
        openProjectDrawer,
        closeProjectDrawer,
        handleProjectSubmit,
        deleteProject,
    } = useProjectMutation(refreshList);

    const columns = [
        {
            title: "Project Name",
            dataIndex: "name",
            key: "name",
            render: (name) => <strong>{name}</strong>
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            ellipsis: true
        },
        {
            title: "Team",
            key: "team",
            render: (record) => (
                <Tag color="purple">
                    {record?.team?.name || 'No Team'}
                </Tag>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space>
                    <IconButton
                        icon={getIcon("edit")}
                        onClick={() => openProjectDrawer(record)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Delete Project"
                        description="Are you sure you want to delete this project?"
                        onConfirm={() => deleteProject(record._id)}
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
            width: 150,
            align: "center"
        },
    ];

    const pageHeader = (
        <CustomPageHeader
            title={`Projects (${totalProjects})`}
            extra={[
                <PrimaryBtn
                    key={1}
                    btnName="Create New Project"
                    onClick={() => openProjectDrawer(null)}
                />
            ]}
        />
    );

    return (
        <PageWrapper pageHeader={pageHeader}>
            <Table
                columns={columns}
                dataSource={projectList}
                loading={loading}
                pagination={{
                    total: totalProjects,
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} projects`
                }}
                rowKey={(row) => row._id}
            />

            <FormDrawer
                open={projectDrawerVisible}
                closeDrawer={closeProjectDrawer}
                title={`${project ? "Edit" : "Add New"} Project`}
                btnNameOk={project ? "Confirm Edit Project" : "Confirm New Project"}
                handleOk={() => form.submit()}
                loading={projectSubmitLoading}
                handleCancel={closeProjectDrawer}
            >
                <ProjectForm
                    form={form}
                    project={project}
                    handleProjectSubmit={handleProjectSubmit}
                />
            </FormDrawer>
        </PageWrapper>
    );
};

export default ProjectListView;
