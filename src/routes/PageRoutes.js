import {lazy} from 'react';
import * as PATH from "./Slug";
import Roles from "../constant/Roles.js";

const DashboardView = lazy(() => import("../pages/dashboard/Dashboard.jsx"));
const TeamListView = lazy(() => import("../pages/team/TeamListView.jsx"));
const ProjectListView = lazy(() => import("../pages/project/ProjectListView.jsx"));
const TaskListView = lazy(() => import("../pages/task/TaskListView.jsx"));

const PageRoutes = [
    {
        path: PATH.DASHBOARD_VIEW_PATH,
        component: DashboardView,
        roles: [Roles.ALL]
    },
    {
        path: PATH.TEAM_LIST_VIEW_PATH,
        component: TeamListView,
        roles: [Roles.ALL]
    },
    {
        path: PATH.PROJECT_LIST_VIEW_PATH,
        component: ProjectListView,
        roles: [Roles.ALL]
    },
    {
        path: PATH.TASK_LIST_VIEW_PATH,
        component: TaskListView,
        roles: [Roles.ALL]
    },
]

export default PageRoutes;
