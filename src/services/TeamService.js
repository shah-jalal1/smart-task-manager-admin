import * as API_URL from "../constant/APIUrl.js"
import privateAPI from "../rest-handlers/privateAPI.js";

export default class TeamService {

    static getTeamList = params =>
        privateAPI.get(API_URL.GET_ALL_TEAMS_URL, {params});

    static createTeam = data =>
        privateAPI.post(API_URL.CREATE_TEAM_URL, data);

    static getTeam = id =>
        privateAPI.get(API_URL.GET_TEAM_URL(id));

    static updateTeam = (id, data) =>
        privateAPI.put(API_URL.UPDATE_TEAM_URL(id), data);

    static deleteTeam = id =>
        privateAPI.delete(API_URL.DELETE_TEAM_URL(id));

    static getTeamWorkload = id =>
        privateAPI.get(API_URL.GET_TEAM_WORKLOAD_URL(id));

    static addMember = (id, data) =>
        privateAPI.post(API_URL.ADD_TEAM_MEMBER_URL(id), data);

    static updateMember = (teamId, memberId, data) =>
        privateAPI.put(API_URL.UPDATE_TEAM_MEMBER_URL(teamId, memberId), data);

    static deleteMember = (teamId, memberId) =>
        privateAPI.delete(API_URL.DELETE_TEAM_MEMBER_URL(teamId, memberId));

}
