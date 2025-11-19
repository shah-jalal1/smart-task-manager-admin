import React from 'react';
import {Table, Form, Input, Col, Popconfirm} from "antd";
import SearchCard from "../../components/common/SearchCard.jsx";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import FormDrawer from "../../components/drawer/FormDrawer.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {getIcon} from "../../components/Icons.jsx";
import DefaultBtn from "../../components/buttons/DefaultBtn.jsx";
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
            key: "name",
            width: 200,
            render: (e) => <strong>{e?.name}</strong>
        },
        {
            title: "Description",
            key: "description",
            render: (e) => e?.description || "-"
        },
        {
            title: "Team",
            key: "team",
            width: 150,
            render: (e) => e?.team?.name || "-"
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <div style={{display: "flex", gap: 8}}>
                    <DefaultBtn
                        icon={getIcon("edit")}
                        onClick={() => openProjectDrawer(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this project?"
                        onConfirm={() => deleteProject(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DefaultBtn
                            icon={getIcon("delete")}
                            danger
                        />
                    </Popconfirm>
                </div>
            ),
            width: 150,
            align: "center"
        },
    ];

    const pageHeader = (
        <CustomPageHeader
            title="Projects"
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
            <div>
                <SearchCard title="Total Projects" count={totalProjects}>
                    <Col md={6}>
                        <Input allowClear placeholder="Search projects" />
                    </Col>
                </SearchCard>

                <Table
                    columns={columns}
                    dataSource={projectList}
                    loading={loading}
                    pagination={false}
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
            </div>
        </PageWrapper>
    );
};

export default ProjectListView;
