import {Icons} from "../helpers/Icons.jsx";

// Authentication & Storage Keys
export const TEMP_USER = "temp-user";
export const ACCESS_TOKEN = "smart-task-manager-access-token";
export const PROFILE = "smart-task-manager-profile";

// Date & Time Formats
export const DATE_FORMAT = "YYYY-MM-DD";
export const DATE_FORMAT_TWO = "MMM YYYY-MM-DD";
export const DATE_FORMAT_THREE = "MMM DD, YYYY";
export const TIME_FORMAT = "hh:mm:ss A";

// Need Help Types
export const LOST_DEVICE = "LOST_DEVICE";
export const FORGOT_USERNAME = "FORGOT_USERNAME";

// MIME Type to File Extension Mapping
export const mimeToExtension = {

    // Documents
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',

    // Text and Code
    'text/plain': 'txt',
    'text/csv': 'csv',
    'application/csv': 'csv',
    'application/json': 'json',
    'application/xml': 'xml',
    'text/html': 'html',
    'text/css': 'css',
    'application/javascript': 'js',

    // Images
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/bmp': 'bmp',
    'image/svg+xml': 'svg',
    'image/x-icon': 'ico',

    // Archives
    'application/zip': 'zip',
    'application/x-rar-compressed': 'rar',
    'application/x-7z-compressed': '7z',
    'application/gzip': 'gz',
    'application/x-tar': 'tar',

    // Audio
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/webm': 'weba',

    // Video
    'video/mp4': 'mp4',
    'video/x-msvideo': 'avi',
    'video/webm': 'webm',
    'video/ogg': 'ogv',
};

export const TEMP_PASS_ACCESS_TOKEN = "smart-task-manager-temp-pass-token";

export const packageType = {
    FREE: 'FREE',
    STARTER: 'STARTER',
    PRO: 'PRO',
    ONE_OFF: 'ONE_OFF',
}

export const addressChangeStatus = {
    PENDING: {
        type: "PENDING",
        name: "Pending",
        color: "#E17100",
        bgColor: "#E1710026",
        icon: Icons.CloseCircle,
        iconClass: "icon-error",
        "canRemind": true,
        "canDelete": true
    },
    IN_PROGRESS: {
        type: "IN_PROGRESS",
        name: "In Progress",
        color: "#4588F7",
        bgColor: "#4588F7",
        icon: Icons.Clock,
        iconClass: "icon-info",
        "canRemind": true,
        "canDelete": false
    },
    COMPLETED: {
        type: "COMPLETED",
        name: "COMPLETED",
        color: "#009838",
        bgColor: "#42CD75",
        icon: Icons.CheckCircle2,
        iconClass: "icon-success",
        "canRemind": false,
        "canDelete": false
    },
    CANCELED: {
        type: "CANCELED",
        name: "Canceled",
        color: "#EF4444",
        bgColor: "#FDE3E3",
        icon: Icons.Clock,
        iconClass: "icon-cancelled",
        "canRemind": true,
        "canDelete": true
    },
    FAILED: {
        type: "FAILED",
        name: "Failed",
        color: "#CC2121",
        bgColor: "#EF444426",
        icon: Icons.Warning,
        iconClass: "icon-error",
        "canRemind": false,
        "canDelete": false
    },
    REJECTED: {
        type: "REJECTED",
        name: "Rejected",
        color: "#EF4444",
        bgColor: "#FDE3E3",
        icon: Icons.CloseCircle,
        iconClass: "icon-error",
        "canRemind": false,
        "canDelete": false
    },
};

export const packageTypeStyle = {
    PRO: {
        type: "PRO",
        name: "Pro",
        color: "#2563EB",
        bgColor: "#DBEAFE",
    },
    FREE: {
        type: "FREE",
        name: "Free",
        color: "#42526D",
        bgColor: "#F5F6F7",
    },
    STARTER: {
        type: "STARTER",
        name: "Starter",
        color: "#1AB56D",
        bgColor: "#EAFFF5",
    },
    ENTERPRISE: {
        type: "ENTERPRISE",
        name: "Enterprise",
        color: "#6C63FF",
        bgColor: "#F2F2FF",
    },
    ONE_OFF: {
        type: "ONE_OFF",
        name: "One Off",
        color: "#F59E0B",
        bgColor: "#FEF3C7",
    },
};

export const API_TYPE = {
    "AVAILABLE": "Available",
    "UNAVAILABLE": "Unavailable",
}

export const organizationFieldType = {
    INPUT: 'INPUT',
    DATE: 'DATE',
    FILE: 'FILE',
}

export const requestStatus = {
    active: "active",
    completed: "completed",
}

export const OTHERS_CATEGORY = "Others";