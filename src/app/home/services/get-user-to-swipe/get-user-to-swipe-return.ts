export interface GetUserToSwipeReturn {
    success: true;
    message: '';
    id: number;
    firstname: string;
    bio: string;
    position: {
        latitude: number;
        longitude: number;
    };
    year: number;
    popularity: number;
    online: number;
    lastConnected: Date;
}
