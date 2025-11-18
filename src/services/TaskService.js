import * as API_URL from "../constant/APIUrl.js"
import privateAPI from "../rest-handlers/privateAPI.js";

export default class TaskService {

    static getTaskList = params =>
        privateAPI.get(API_URL.GET_ALL_TASKS_URL, {params});

    static createTask = data =>
        privateAPI.post(API_URL.CREATE_TASK_URL, data);

    static getTask = id =>
        privateAPI.get(API_URL.GET_TASK_URL(id));

    static updateTask = (id, data) =>
        privateAPI.put(API_URL.UPDATE_TASK_URL(id), data);

    static deleteTask = id =>
        privateAPI.delete(API_URL.DELETE_TASK_URL(id));

    static autoAssignTask = id =>
        privateAPI.post(API_URL.AUTO_ASSIGN_TASK_URL(id));

}
