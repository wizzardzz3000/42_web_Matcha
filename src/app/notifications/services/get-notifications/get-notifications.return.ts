export interface GetNotificationsReturn {
    success: true;
    message: string;
    notifications: Notification[];
}

export interface Notification {
    id_notif: number;
    id_user_: number;
    notif: number;
    id_user: number;
    firstname: string;
    lastname: string;
    ts: string;
}