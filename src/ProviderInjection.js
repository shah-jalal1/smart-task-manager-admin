import AuthContextProvider from "./context/AuthContextProvider.jsx";
import ToastContextProvider from "./context/ToastContextProvider.jsx";
import DashboardContextProvider from "./context/DashboardContextProvider.jsx";
import TeamContextProvider from "./context/TeamContextProvider.jsx";
import ProjectContextProvider from "./context/ProjectContextProvider.jsx";
import TaskContextProvider from "./context/TaskContextProvider.jsx";
import GlobalContextProvider from "./context/GlobalContextProvider.jsx";

export const providers = [
    ToastContextProvider,
    GlobalContextProvider,
    AuthContextProvider,
    DashboardContextProvider,
    TeamContextProvider,
    ProjectContextProvider,
    TaskContextProvider
]
