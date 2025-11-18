import * as PATH from "../routes/Slug";
import {getIcon} from "../components/Icons.jsx";
import Roles from "../constant/Roles.js";

const Navs = [
    {
        key: "dashboard",
        title: "Dashboard",
        path: PATH.DASHBOARD_VIEW_PATH,
        icon: getIcon("dashboard"),
        notification: false,
        subMenu: null,
        roles: [Roles.ALL]
    },
    {
        key: "teams",
        title: "Teams",
        path: PATH.TEAM_LIST_VIEW_PATH,
        icon: getIcon("user"),
        notification: false,
        subMenu: null,
        roles: [Roles.ALL]
    },
    {
        key: "projects",
        title: "Projects",
        path: PATH.PROJECT_LIST_VIEW_PATH,
        icon: getIcon("building_office"),
        notification: false,
        subMenu: null,
        roles: [Roles.ALL]
    },
    {
        key: "tasks",
        title: "Tasks",
        path: PATH.TASK_LIST_VIEW_PATH,
        icon: getIcon("squares_four"),
        notification: false,
        subMenu: null,
        roles: [Roles.ALL]
    },
]

export default Navs;
