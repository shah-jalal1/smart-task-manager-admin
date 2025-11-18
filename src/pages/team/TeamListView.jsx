import {Table, Form, Popconfirm, Tag, Space} from "antd";
import PrimaryBtn from "../../components/buttons/PrimaryBtn.jsx";
import FormDrawer from "../../components/drawer/FormDrawer.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {getIcon} from "../../components/Icons.jsx";
import IconButton from "../../components/buttons/IconButton.jsx";
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
            dataIndex: "name",
            key: "name",
            render: (name) => <strong>{name}</strong>
        },
        {
            title: "Total Members",
            key: "members",
            render: (record) => record?.members?.length || 0
        },
        {
            title: "Members",
            key: "membersList",
            render: (record) => (
                <Space wrap>
                    {record?.members?.map((member, idx) => (
                        <Tag key={idx} color="blue">
                            {member.name} ({member.role}) - Capacity: {member.capacity}
                        </Tag>
                    ))}
                </Space>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (record) => (
                <Space>
                    <IconButton
                        icon={getIcon("edit")}
                        onClick={() => openTeamDrawer(record)}
                        title="Edit"
                    />
                    <Popconfirm
                        title="Delete Team"
                        description="Are you sure you want to delete this team?"
                        onConfirm={() => deleteTeam(record._id)}
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
            title={`Teams (${totalTeams})`}
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
            <Table
                columns={columns}
                dataSource={teamList}
                loading={loading}
                pagination={{
                    total: totalTeams,
                    pageSize: 10,
                    showSizeChanger: true,
                    showTotal: (total) => `Total ${total} teams`
                }}
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
        </PageWrapper>
    );
};

export default TeamListView;
