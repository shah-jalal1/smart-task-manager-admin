import * as API_URL from "../constant/APIUrl.js"
import privateAPI from "../rest-handlers/privateAPI.js";

export default class DashboardService {

    static getDashboard = () =>
        privateAPI.get(API_URL.GET_DASHBOARD_URL);

    static reassignTasks = () =>
        privateAPI.post(API_URL.REASSIGN_TASKS_URL);

    static getActivityLogs = params =>
        privateAPI.get(API_URL.GET_ACTIVITY_LOGS_URL, {params});

    static getTeamWorkloadSummary = () =>
        privateAPI.get(API_URL.GET_ALL_TEAMS_URL);

}
