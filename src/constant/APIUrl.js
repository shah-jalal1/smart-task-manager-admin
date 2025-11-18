const API_VERSION = "api"

const VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const BASE_URL = `${VITE_APP_BASE_URL}/${API_VERSION}`;

// Authentication URLs
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const GET_ME_URL = `${BASE_URL}/auth/me`;

// Team URLs
export const GET_ALL_TEAMS_URL = `${BASE_URL}/teams`;
export const CREATE_TEAM_URL = `${BASE_URL}/teams`;
export const GET_TEAM_URL = (id) => `${BASE_URL}/teams/${id}`;
export const UPDATE_TEAM_URL = (id) => `${BASE_URL}/teams/${id}`;
export const DELETE_TEAM_URL = (id) => `${BASE_URL}/teams/${id}`;
export const GET_TEAM_WORKLOAD_URL = (id) => `${BASE_URL}/teams/${id}/workload`;
export const ADD_TEAM_MEMBER_URL = (id) => `${BASE_URL}/teams/${id}/members`;
export const UPDATE_TEAM_MEMBER_URL = (teamId, memberId) => `${BASE_URL}/teams/${teamId}/members/${memberId}`;
export const DELETE_TEAM_MEMBER_URL = (teamId, memberId) => `${BASE_URL}/teams/${teamId}/members/${memberId}`;

// Project URLs
export const GET_ALL_PROJECTS_URL = `${BASE_URL}/projects`;
export const CREATE_PROJECT_URL = `${BASE_URL}/projects`;
export const GET_PROJECT_URL = (id) => `${BASE_URL}/projects/${id}`;
export const UPDATE_PROJECT_URL = (id) => `${BASE_URL}/projects/${id}`;
export const DELETE_PROJECT_URL = (id) => `${BASE_URL}/projects/${id}`;

// Task URLs
export const GET_ALL_TASKS_URL = `${BASE_URL}/tasks`;
export const CREATE_TASK_URL = `${BASE_URL}/tasks`;
export const GET_TASK_URL = (id) => `${BASE_URL}/tasks/${id}`;
export const UPDATE_TASK_URL = (id) => `${BASE_URL}/tasks/${id}`;
export const DELETE_TASK_URL = (id) => `${BASE_URL}/tasks/${id}`;
export const AUTO_ASSIGN_TASK_URL = (id) => `${BASE_URL}/tasks/${id}/auto-assign`;

// Dashboard URLs
export const GET_DASHBOARD_URL = `${BASE_URL}/dashboard`;
export const REASSIGN_TASKS_URL = `${BASE_URL}/dashboard/reassign-tasks`;
export const GET_ACTIVITY_LOGS_URL = `${BASE_URL}/dashboard/activity`;
