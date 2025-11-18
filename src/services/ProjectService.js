import * as API_URL from "../constant/APIUrl.js"
import privateAPI from "../rest-handlers/privateAPI.js";

export default class ProjectService {

    static getProjectList = params =>
        privateAPI.get(API_URL.GET_ALL_PROJECTS_URL, {params});

    static createProject = data =>
        privateAPI.post(API_URL.CREATE_PROJECT_URL, data);

    static getProject = id =>
        privateAPI.get(API_URL.GET_PROJECT_URL(id));

    static updateProject = (id, data) =>
        privateAPI.put(API_URL.UPDATE_PROJECT_URL(id), data);

    static deleteProject = id =>
        privateAPI.delete(API_URL.DELETE_PROJECT_URL(id));

}
