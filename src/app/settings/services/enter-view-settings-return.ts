export interface EnterViewSettingsReturn {
    success: boolean;
    message: string;
    user: User[];
}

export interface User {
    idUser: number;
    firstname: string;
    lastname: string;
    email: string;
    notif: boolean;
    birthdate: Date;
    distance: number;
    bio: string;
    online: number;
    lastConnected: Date;
    pop: number;
}
