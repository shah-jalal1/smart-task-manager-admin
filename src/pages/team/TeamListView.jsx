import React from 'react';
import {Table, Form, Input, Col, Popconfirm, Tag} from "antd";
import SearchCard from "../../components/common/SearchCard.jsx";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import FormDrawer from "../../components/drawer/FormDrawer.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {getIcon} from "../../components/Icons.jsx";
import DefaultBtn from "../../components/buttons/DefaultBtn.jsx";
import useTeamList from "../../hooks/team/useTeamList.js";
import useTeamMutation from "../../hooks/team/useTeamMutation.js";
import TeamForm from "./TeamForm.jsx";

const TeamListView = () => {
    const [form] = Form.useForm();

    const {loading, teamList, totalTeams, refreshList} = useTeamList();

    const {
        teamDrawerVisible,
        teamSubmitLoading,
        team,
        openTeamDrawer,
        closeTeamDrawer,
        handleTeamSubmit,
        deleteTeam,
    } = useTeamMutation(refreshList);

    const columns = [
        {
            title: "Team Name",
            key: "name",
            width: 150,
            render: (e) => <strong>{e?.name}</strong>
        },
        {
            title: "Total Members",
            key: "members",
            width: 150,
            render: (e) => e?.members?.length || 0
        },
        {
            title: "Members",
            key: "membersList",
            render: (e) => (
                <div>
                    {e?.members?.map((member, idx) => (
                        <Tag key={idx} color="blue">
                            {member.name} ({member.role}) - Capacity: {member.capacity}
                        </Tag>
                    ))}
                </div>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <div style={{display: "flex", gap: 8}}>
                    <DefaultBtn
                        icon={getIcon("edit")}
                        onClick={() => openTeamDrawer(record)}
                    />
                    <Popconfirm
                        title="Are you sure you want to delete this team?"
                        onConfirm={() => deleteTeam(record._id)}
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
            title="Teams"
            extra={[
                <PrimaryBtn
                    key={1}
                    btnName="Create New Team"
                    onClick={() => openTeamDrawer(null)}
                />
            ]}
        />
    );

    return (
        <PageWrapper pageHeader={pageHeader}>
            <div>
                <SearchCard title="Total Teams" count={totalTeams}>
                    <Col md={6}>
                        <Input allowClear placeholder="Search teams" />
                    </Col>
                </SearchCard>

                <Table
                    columns={columns}
                    dataSource={teamList}
                    loading={loading}
                    pagination={false}
                    rowKey={(row) => row._id}
                />

                <FormDrawer
                    open={teamDrawerVisible}
                    closeDrawer={closeTeamDrawer}
                    title={`${team ? "Edit" : "Add New"} Team`}
                    btnNameOk={team ? "Confirm Edit Team" : "Confirm New Team"}
                    handleOk={() => form.submit()}
                    loading={teamSubmitLoading}
                    handleCancel={closeTeamDrawer}
                >
                    <TeamForm
                        form={form}
                        team={team}
                        handleTeamSubmit={handleTeamSubmit}
                    />
                </FormDrawer>
            </div>
        </PageWrapper>
    );
};

export default TeamListView;
