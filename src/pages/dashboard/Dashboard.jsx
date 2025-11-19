import React, {useContext, useEffect, useState} from 'react';
import {Row, Col, Card, Statistic, Button, Table, Tag, List, Typography} from "antd";
import {DashboardContext} from "../../context/DashboardContextProvider.jsx";
import CustomPageHeader from "../../components/layout/page-header/CustomPageHeader.jsx";
import PageWrapper from "../../components/common/PageWrapper.jsx";
import {Toast} from "../../components/common/Toast.jsx";
import DashboardService from "../../services/DashboardService.js";
import {getErrorMessage} from "../../utils/GenericUtils.js";
import "./dashboard.scss";

const {Title, Text} = Typography;

const Dashboard = () => {
    const {getDashboard, getActivityLogs, getTeamWorkloadSummary, dashboardData, activityLogs, teamWorkload, loading} = useContext(DashboardContext);
    const [reassigning, setReassigning] = useState(false);

    useEffect(() => {
        loadDashboard();
        loadActivityLogs();
        loadTeamWorkload();
    }, []);

    const loadDashboard = async () => {
        await getDashboard();
    };

    const loadActivityLogs = async () => {
        await getActivityLogs();
    };

    const loadTeamWorkload = async () => {
        await getTeamWorkloadSummary();
    };

    // Flatten team members for the table
    const flattenedTeamMembers = React.useMemo(() => {
        if (!teamWorkload || teamWorkload.length === 0) {
            // Fallback to dashboardData if teamWorkload is not available
            if (!dashboardData?.teamSummary) return [];
            
            const members = [];
            dashboardData.teamSummary.forEach(team => {
                if (Array.isArray(team.members)) {
                    team.members.forEach(member => {
                        members.push({
                            ...member,
                            teamName: team.teamName,
                            teamId: team.teamId
                        });
                    });
                }
            });
            return members;
        }
        
        // Use teamWorkload data
        const members = [];
        teamWorkload.forEach(team => {
            if (Array.isArray(team.members)) {
                team.members.forEach(member => {
                    members.push({
                        ...member,
                        teamName: team.name,
                        teamId: team._id
                    });
                });
            }
        });
        return members;
    }, [dashboardData, teamWorkload]);

    const handleReassignTasks = async () => {
        try {
            setReassigning(true);
            const res = await DashboardService.reassignTasks();
            Toast("success", "Success", res.data.message || "Tasks reassigned successfully");
            await loadDashboard();
            await loadActivityLogs();
            await loadTeamWorkload();
        } catch (error) {
            const message = getErrorMessage(error);
            Toast("error", "Error", message);
        } finally {
            setReassigning(false);
        }
    };

    const teamColumns = [
        {
            title: "Team Name",
            dataIndex: "teamName",
            key: "teamName",
            render: (name) => <Tag color="purple">{name}</Tag>
        },
        {
            title: "Member Name",
            dataIndex: "name",
            key: "name",
            render: (name) => <strong>{name}</strong>
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role"
        },
        {
            title: "Current Tasks",
            dataIndex: "currentTasks",
            key: "currentTasks",
            render: (count) => <Tag color="blue">{count}</Tag>
        },
        {
            title: "Capacity",
            dataIndex: "capacity",
            key: "capacity",
            render: (capacity) => <Tag color="green">{capacity}</Tag>
        },
        {
            title: "Status",
            key: "status",
            render: (member) => {
                const isOverloaded = member.currentTasks > member.capacity;
                return (
                    <Tag color={isOverloaded ? "red" : "green"}>
                        {isOverloaded ? "Overloaded" : "Normal"}
                    </Tag>
                );
            }
        }
    ];

    const pageHeader = (
        <CustomPageHeader
            title="Dashboard"
            extra={[
                <Button
                    key={1}
                    type="primary"
                    danger
                    onClick={handleReassignTasks}
                    loading={reassigning}
                    size="large"
                >
                    Reassign Tasks
                </Button>
            ]}
        />
    );

    return (
        <PageWrapper pageHeader={pageHeader}>
            <div className="dashboard-container">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Total Projects"
                                value={dashboardData?.totalProjects || 0}
                                valueStyle={{color: '#3f8600'}}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Total Tasks"
                                value={dashboardData?.totalTasks || 0}
                                valueStyle={{color: '#1890ff'}}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="Pending Tasks"
                                value={dashboardData?.tasksByStatus?.Pending || 0}
                                valueStyle={{color: '#faad14'}}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={6}>
                        <Card>
                            <Statistic
                                title="In Progress"
                                value={dashboardData?.tasksByStatus?.['In Progress'] || 0}
                                valueStyle={{color: '#722ed1'}}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginTop: 24}}>
                    <Col xs={24}>
                        <Card title="Team Workload Summary">
                            <Table
                                columns={teamColumns}
                                dataSource={flattenedTeamMembers}
                                loading={loading}
                                pagination={false}
                                rowKey={(row) => row._id}
                            />
                        </Card>
                    </Col>
                </Row>

                <Row gutter={[16, 16]} style={{marginTop: 24}}>
                    <Col xs={24}>
                        <Card title="Recent Activity Logs">
                            <List
                                dataSource={activityLogs || []}
                                loading={loading}
                                renderItem={(log) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={
                                                <div>
                                                    <Text strong>{log.action}</Text>
                                                    <Text type="secondary" style={{marginLeft: 8, fontSize: 12}}>
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </Text>
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <div>Task: <Text strong>{log.taskTitle}</Text></div>
                                                    <div>Project: <Text strong>{log.project?.name}</Text></div>
                                                    {log.fromMember !== "Unassigned" && (
                                                        <div>From: {log.fromMember} → To: {log.toMember}</div>
                                                    )}
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
